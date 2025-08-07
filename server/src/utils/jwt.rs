use chrono::{Duration, Utc};
use jsonwebtoken::{errors::Error, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};

pub const EXPIRE_ONE_DAY: i64 = 24;

#[derive(Debug, Serialize, Deserialize)]
pub struct Claims {
    email: String,
    exp: usize,
}

pub fn encode(jwt_secret: &str, email: String, last_hours: i64) -> Result<String, Error> {
    let expiration = Utc::now()
        .checked_add_signed(Duration::hours(last_hours))
        .unwrap()
        .timestamp();

    let claims = Claims {
        email,
        exp: expiration as usize,
    };

    jsonwebtoken::encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(jwt_secret.as_bytes()),
    )
}

pub fn decode(jwt_secret: &str, token: &str) -> Result<String, Error> {
    let token_data = jsonwebtoken::decode::<Claims>(
        token,
        &DecodingKey::from_secret(jwt_secret.as_bytes()),
        &Validation::default(),
    )?;

    Ok(token_data.claims.email)
}
