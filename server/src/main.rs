use axum::{
    extract::DefaultBodyLimit,
    http::{header, Method},
    Router,
};
use bb8::Pool;
use diesel_async::{pooled_connection::AsyncDieselConnectionManager, AsyncPgConnection};
use dotenvy::dotenv;
use libvips_windows::VipsApp;
use std::{cmp, env, net::SocketAddr, sync::Arc};
use tower_cookies::CookieManagerLayer;
use tower_http::{cors::CorsLayer, trace::TraceLayer};
use tracing::Level;

mod models;
mod routes;
mod schema;
mod utils;

use routes::{property::property_routes, user::user_routes};

pub const MAX_REQUEST_SIZE: usize = 200 * 1024 * 1024;

struct DatabaseConfig {
    address: String,
    name: String,
    user: String,
    password: String,
}

struct Config {
    database: DatabaseConfig,
    jwt_secret: String,
    log_level: Level,
    port: u16,
}

#[derive(Clone)]
struct AppState {
    jwt_secret: String,
    connection_pool: Pool<AsyncDieselConnectionManager<AsyncPgConnection>>,
}

fn load_config() -> Config {
    dotenv().ok();

    let address = env::var("DB_ADDRESS");

    let db_config = DatabaseConfig {
        address: match address {
            Ok(value) => value,
            Err(_) => "localhost:5432".to_owned(),
        },
        name: env::var("DB_NAME").expect("Database name variable not set"),
        user: env::var("DB_USER").expect("Database user variable not set"),
        password: env::var("DB_PASSWORD").expect("Database password variable not set"),
    };

    let log_level = match env::var("LOG_LEVEL") {
        Ok(value) => value,
        Err(_) => "Debug".to_owned(),
    };

    let log_level = match log_level.as_str() {
        "Trace" => Level::TRACE,
        "Debug" => Level::DEBUG,
        "Info" => Level::INFO,
        "Warm" => Level::WARN,
        "Error" => Level::ERROR,
        _ => Level::INFO,
    };

    let port = match env::var("PORT") {
        Ok(value) => value.parse::<u16>().expect("Port variable is not an u16"),
        Err(_) => 3001,
    };

    Config {
        database: db_config,
        jwt_secret: env::var("JWT_SECRET").expect("JWT secret variable not set"),
        log_level,
        port,
    }
}

#[tokio::main]
async fn main() {
    let config = load_config();

    let vips = VipsApp::new("libvips rust", false).expect("Cannot initialize libvips");
    vips.concurrency_set(cmp::max(num_cpus::get() - 1, 1) as i32);

    let manager = AsyncDieselConnectionManager::<diesel_async::AsyncPgConnection>::new(format!(
        "postgres://{}:{}@{}/{}",
        config.database.user,
        config.database.password,
        config.database.address,
        config.database.name
    ));
    let pool = Pool::builder()
        .max_size(15)
        .min_idle(1)
        .build(manager)
        .await
        .expect("Failed to create connection pool");

    let app_state = Arc::new(AppState {
        jwt_secret: config.jwt_secret,
        connection_pool: pool,
    });

    let allowed_origins = [
        "http://localhost:3000".parse().unwrap(),
        "https://reaest.com".parse().unwrap(),
    ];

    let cors = CorsLayer::new()
        .allow_origin(allowed_origins)
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::DELETE,
            Method::PATCH,
            Method::OPTIONS,
        ])
        .allow_headers([
            header::CONTENT_TYPE,
            header::COOKIE,
            header::ACCEPT,
            header::CONTENT_LENGTH,
            header::CONNECTION,
            header::USER_AGENT,
            header::ORIGIN,
            header::HOST,
            header::ACCEPT_ENCODING,
            header::ACCEPT_LANGUAGE,
            header::REFERER,
        ])
        .allow_credentials(true);
    /*
        if cfg!(debug_assertions) {
            cors = cors.allow_origin(tower_http::cors::Any);
        }
    */
    tracing_subscriber::fmt()
        .with_max_level(config.log_level)
        .init();

    let routes = Router::new()
        .nest("/api", property_routes())
        .nest("/api", user_routes())
        .with_state(app_state.clone())
        .layer(TraceLayer::new_for_http())
        .layer(CookieManagerLayer::new())
        .layer(cors);

    let address = SocketAddr::from(([127, 0, 0, 1], config.port));
    let listener = tokio::net::TcpListener::bind(address)
        .await
        .expect("Failed to create tokio tcp listener");

    axum::serve(listener, routes)
        .await
        .expect("Failed to create axum server");
}
