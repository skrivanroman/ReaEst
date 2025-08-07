use crate::schema::{properties, users};
use crate::utils::path;
use crate::AppState;
use crate::{routes::AUTH_TOKEN, utils::jwt};
use axum::extract::DefaultBodyLimit;
use axum::{
    extract::{Multipart, Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    routing::get,
    Json, Router,
};
use bytes::Bytes;
use chrono::NaiveDate;
use diesel::{prelude::*, result::Error as DieselError};
use diesel_async::RunQueryDsl;
use futures::future::join_all;
use libvips_windows::{bindings, ops, VipsImage};
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::{fs, task::JoinHandle};
use tower_cookies::Cookies;

#[derive(Debug)]
pub enum Error {
    NoAuthToken,
    JwtError,
    BadRequest,
    VipsError,
    FileError,
    ImageProcessingError,
    PoolError,
    UserNotFound,
    SqlError,
}

impl IntoResponse for Error {
    fn into_response(self) -> axum::response::Response {
        println!("{:?}", self);
        if format!("{:?}", self) == "VipsError" || format!("{:?}", self) == "FileError" {
            unsafe {
                let error_message =
                    std::ffi::CStr::from_ptr(bindings::vips_error_buffer()).to_string_lossy();
                println!("libvips error buffer: {}", error_message);
                bindings::vips_error_clear();
            }
        }
        (StatusCode::INTERNAL_SERVER_ERROR, format!("{:?}", self)).into_response()
    }
}

#[derive(Serialize)]
struct Property {
    title: String,
    price: i32,
}

async fn get_property(Path(property_id): Path<String>) -> Json<Property> {
    todo!()
}
#[derive(Deserialize)]
struct SearchParams;

async fn list_properties(Query(params): Query<SearchParams>) -> Json<Vec<Property>> {
    let prop = Property {
        title: "Nabrezi".to_owned(),
        price: 333,
    };
    Json(vec![prop])
}

const DATA_FIELD: &str = "data";
const IMAGE_FIELD: &str = "images";
const THUMB_FORMAT: &str = ".jpg";
const THUMB_WIDTH: i32 = 250;
const THUMB_HEIGHT: i32 = 270;

pub enum ImageFormat {}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct PropertyPostData {
    title: String,
    description: Option<String>,
    category: String,
    price: f64,
    yearly_tax: Option<f64>,
    status: Option<String>,
    pay_type: String,
    after_price: Option<String>,
    street: Option<String>,
    country: Option<String>,
    city: Option<String>,
    region: Option<String>,
    zip_code: Option<String>,
    city_part: Option<String>,
    size: Option<f64>,
    room_count: Option<u32>,
    bedroom_count: Option<u32>,
    bathroom_count: Option<u32>,
    garage_count: Option<u32>,
    custom_id: Option<String>,
    year_built: Option<NaiveDate>,
    latitude: Option<String>,
    longitude: Option<String>,
}

#[derive(Serialize)]
struct UploadResult {
    success: bool,
}

fn process_image(
    image_data: Bytes,
    image_num: usize,
    property_id: String,
) -> Result<(i32, i32, &'static str), Error> {
    let image = VipsImage::new_from_buffer(&image_data, "access=sequential").map_err(|err| {
        println!("{err} first!");
        Error::VipsError
    })?;

    let options = ops::ThumbnailBufferOptions {
        height: THUMB_HEIGHT,
        crop: ops::Interesting::Centre,
        size: ops::Size::Down,
        export_profile: "srgb".to_owned(),
        ..Default::default()
    };

    let mut thumbnail: Option<VipsImage> = None;
    if image_num < 5 {
        thumbnail = Some(
            ops::thumbnail_buffer_with_opts(&image_data, THUMB_WIDTH, &options).map_err(|err| {
                println!("{err} second!");
                Error::VipsError
            })?,
        );
    }

    let image_width = image.get_width();
    let image_height = image.get_height();

    let mut image_path = path::property_dir();
    image_path.push(property_id);

    if image_num < 5 {
        let mut thumb_path = image_path.clone();
        thumb_path.push(format!("thumb-{image_num}.jpg"));
        ops::jpegsave(
            &thumbnail.unwrap(),
            thumb_path.as_os_str().to_str().unwrap(),
        )
        .map_err(|_| Error::FileError)?;
    }

    image_path.push(format!("{image_num}.jpg"));
    ops::jpegsave(&image, image_path.as_os_str().to_str().unwrap())
        .map_err(|_| Error::FileError)?;

    //fs::write(file_path, image).await.map_err(|_| Error::FileError)?;
    Ok((image_width, image_height, "jpg"))
}

async fn upload_property(
    State(app_state): State<Arc<AppState>>,
    cookies: Cookies,
    mut multipart: Multipart,
) -> Result<Json<UploadResult>, Error> {
    let auth_token = cookies.get(AUTH_TOKEN).ok_or(Error::NoAuthToken)?;

    let property_id = uuid::Uuid::new_v4().to_string();
    let image_folder_path = path::property_dir().join(&property_id);

    fs::create_dir_all(&image_folder_path)
        .await
        .map_err(|_| Error::FileError)?;

    let mut property_data_json: PropertyPostData;
    let mut tasks: Vec<JoinHandle<Result<(i32, i32, &'static str), Error>>> = Vec::new();

    while let Some(field) = multipart
        .next_field()
        .await
        .map_err(|_| Error::BadRequest)?
    {
        let name = field.name().unwrap_or("");
        if name == DATA_FIELD {
            property_data_json =
                serde_json::from_str(&field.text().await.map_err(|_| Error::BadRequest)?)
                    .map_err(|_| Error::BadRequest)?;
        } else if name == IMAGE_FIELD {
            let data = field.bytes().await.unwrap();
            let image_id = tasks.len();
            let property_id_clone = property_id.clone();
            let task = tokio::task::spawn_blocking(move || {
                process_image(data, image_id, property_id_clone)
            });
            tasks.push(task);
        } else {
            return Err(Error::BadRequest);
        }
    }

    let email =
        jwt::decode(&app_state.jwt_secret, auth_token.value()).map_err(|_| Error::JwtError)?;

    let mut connection = app_state
        .connection_pool
        .get()
        .await
        .map_err(|_| Error::PoolError)?;

    let user_id = users::table
        .filter(users::columns::email.eq(email))
        .select(users::columns::user_id)
        .first::<i32>(&mut connection)
        .await
        .map_err(|err| match err {
            DieselError::NotFound => Error::UserNotFound,
            _ => Error::SqlError,
        })?;

    let results = join_all(tasks).await;
    let mut images_info = Vec::new();
    for result in results.into_iter() {
        let result = result.map_err(|_| Error::ImageProcessingError)??;
        images_info.push(result);
    }

    /*
    let new_property = Property {};

    let res = diesel::insert_into(properties::table)
        .values(new_property)
        .returning(Property::as_returning())
        .get_result(connection)
        .map_err(|_| Error::SqlError)?;
    */
    // 9. Insert related images in DB (transaction ideally)

    Ok(Json(UploadResult { success: true }))
}

pub fn property_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/property/{id}", get(get_property))
        .route(
            "/property",
            get(list_properties)
                .post(upload_property)
                .options(async || StatusCode::OK),
        )
        .layer(DefaultBodyLimit::disable())
        .layer(DefaultBodyLimit::max(crate::MAX_REQUEST_SIZE))
}
