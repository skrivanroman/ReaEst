use super::address::Address;
use super::login_option::LoginOption;
use crate::schema::users;
use chrono::{DateTime, NaiveDate, Utc};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(
    Debug, Selectable, Queryable, Identifiable, Associations, Serialize, Deserialize, PartialEq,
)]
#[diesel(belongs_to(LoginOption, foreign_key = fk_login_option_id))]
#[diesel(belongs_to(Address, foreign_key = fk_address_id))]
#[diesel(table_name = users)]
#[diesel(primary_key(user_id))]
pub struct User {
    pub user_id: i32,
    pub email: String,
    pub fk_login_option_id: Option<i32>,
    pub first_name: String,
    pub last_name: String,
    pub password: Option<String>,
    pub birth_date: Option<NaiveDate>,
    pub company_name: Option<String>,
    pub position: Option<String>,
    pub profile_picture_path: Option<String>,
    pub facebook_url: Option<String>,
    pub instagram_url: Option<String>,
    pub twitter_url: Option<String>,
    pub linkedin_url: Option<String>,
    pub website_url: Option<String>,
    pub mobile_phone: Option<String>,
    pub about_me: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub uuid: Option<String>,
    pub fk_address_id: Option<i32>,
    pub office_phone: Option<String>,
    pub is_admin: Option<bool>,
}
