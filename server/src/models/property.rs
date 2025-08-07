use crate::models::{
    address::Address, pay_type::PayType, property_category::PropertyCategory, user::User,
};
use crate::schema::properties;
use bigdecimal::BigDecimal;
use chrono::{DateTime, NaiveDate, Utc};
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Queryable, Identifiable, Associations, Serialize, Deserialize, Insertable)]
#[diesel(table_name = properties)]
#[diesel(belongs_to(User, foreign_key = fk_user_id))]
#[diesel(belongs_to(Address, foreign_key = fk_address_id))]
#[diesel(belongs_to(PayType, foreign_key = fk_pay_type_id))]
#[diesel(belongs_to(PropertyCategory, foreign_key = fk_property_category_id))]
#[diesel(primary_key(property_id))]
pub struct Property {
    pub property_id: i32,
    pub uuid: Option<String>,
    pub title: String,
    pub fk_user_id: i32,
    pub description: Option<String>,
    pub price: Option<i32>,
    pub status: Option<String>,
    pub yearly_tax: Option<BigDecimal>,
    pub after_price: Option<String>,
    pub images_count: Option<i32>,
    pub custom_id: Option<String>,
    pub size: Option<i32>,
    pub room_count: Option<i32>,
    pub bedroom_count: Option<i32>,
    pub bathroom_count: Option<i32>,
    pub garage_count: Option<i32>,
    pub year_built: Option<NaiveDate>,
    pub available_from: Option<NaiveDate>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub fk_address_id: Option<i32>,
    pub fk_property_category_id: Option<i32>,
    pub fk_pay_type_id: Option<i32>,
}
