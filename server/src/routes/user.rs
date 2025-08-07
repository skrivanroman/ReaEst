use crate::models::{address::Address, user::User};
use crate::schema::{addresses, properties, users};
use crate::utils::jwt;
use crate::{routes::AUTH_TOKEN, AppState};
use argon2::{Argon2, PasswordHash, PasswordVerifier};
use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use chrono::NaiveDate;
use diesel::{dsl::count_star, prelude::*, result::Error as DieselError};
use diesel_async::RunQueryDsl;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tower_cookies::{cookie::SameSite, Cookie, Cookies};

#[derive(Debug)]
pub enum Error {
    UserNotFound,
    PoolError,
    SqlError,
    LoginFailed,
    BadLoginOption,
    BadRequest,
    JwtError,
}

impl IntoResponse for Error {
    fn into_response(self) -> axum::response::Response {
        (StatusCode::INTERNAL_SERVER_ERROR, format!("{:?}", self)).into_response()
    }
}

#[derive(Serialize)]
struct RegisterResponse;

async fn register() -> Result<Json<RegisterResponse>, Error> {
    todo!()
}

#[derive(Deserialize)]
struct LoginRequest {
    email: String,
    password: String,
}

#[derive(Serialize)]
struct LoginResponse {
    succes: bool,
}

async fn login(
    State(app_state): State<Arc<AppState>>,
    cookies: Cookies,
    Json(request_body): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, Error> {
    if request_body.email.is_empty() || request_body.password.is_empty() {
        return Err(Error::BadRequest);
    }

    let mut connection = app_state
        .connection_pool
        .get()
        .await
        .map_err(|_| Error::PoolError)?;

    let hashed_password = users::table
        .filter(users::columns::email.eq(&request_body.email))
        .select(users::columns::password.nullable())
        .first::<Option<String>>(&mut connection)
        .await
        .map_err(|err| match err {
            DieselError::NotFound => Error::UserNotFound,
            _ => Error::SqlError,
        })?;

    let hashed_password = hashed_password.ok_or(Error::BadLoginOption)?;
    let hashed_password = PasswordHash::new(&hashed_password).map_err(|_| Error::LoginFailed)?;
    let argon2 = Argon2::default();
    argon2
        .verify_password(request_body.password.as_bytes(), &hashed_password)
        .map_err(|_| Error::LoginFailed)?;

    let jwt_token = jwt::encode(
        &app_state.jwt_secret,
        request_body.email,
        jwt::EXPIRE_ONE_DAY,
    )
    .map_err(|_| Error::JwtError)?;

    let auth_cookie = Cookie::build((AUTH_TOKEN, jwt_token))
        .path("/")
        .http_only(true)
        .secure(!cfg!(debug_assertions))
        .same_site(match cfg!(debug_assertions) {
            true => SameSite::Lax,
            false => SameSite::Strict,
        })
        .build();

    cookies.add(auth_cookie);

    Ok(Json(LoginResponse { succes: true }))
}

// TODO add urls
#[derive(Queryable, Serialize)]
struct UserResponse {
    email: String,
    first_name: String,
    last_name: String,
    company_name: Option<String>,
    mobile_phone: Option<String>,
    office_phone: Option<String>,
    about_me: Option<String>,
    created_at: NaiveDate,
    country: Option<String>,
    city: Option<String>,
    street: Option<String>,
    house_number: Option<String>,
    propety_count: i64,
}

async fn get_user(
    State(app_state): State<Arc<AppState>>,
    Path(search_id): Path<String>,
) -> Result<Json<UserResponse>, Error> {
    let mut connection = app_state
        .connection_pool
        .get()
        .await
        .map_err(|_| Error::PoolError)?;

    let (user, address) = users::table
        .left_join(addresses::table)
        .filter(users::columns::uuid.eq(&search_id))
        .select((User::as_select(), Option::<Address>::as_select()))
        .first::<(User, Option<Address>)>(&mut connection)
        .await
        .map_err(|err| match err {
            DieselError::NotFound => Error::UserNotFound,
            _ => Error::SqlError,
        })?;

    let property_count = users::table
        .inner_join(properties::table)
        .filter(users::uuid.eq(search_id))
        .select(count_star())
        .first::<i64>(&mut connection)
        .await
        .map_err(|err| match err {
            DieselError::NotFound => Error::UserNotFound,
            _ => Error::SqlError,
        })?;

    let user_response = UserResponse {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        company_name: user.company_name,
        mobile_phone: user.mobile_phone,
        office_phone: user.office_phone,
        about_me: user.about_me,
        created_at: user.created_at.date_naive(),
        country: address.as_ref().map(|addr| addr.country.clone()),
        city: address.as_ref().map(|addr| addr.city.clone()),
        street: address.as_ref().map(|addr| addr.street.clone()),
        house_number: address.as_ref().map(|addr| addr.house_number.clone()),
        propety_count: property_count,
    };

    Ok(Json(user_response))
}

pub fn user_routes() -> Router<Arc<AppState>> {
    Router::new()
        .route("/register", post(register))
        .route("/login", post(login))
        .route("/user/{id}", get(get_user))
}
