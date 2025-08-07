use crate::schema::addresses;
use diesel::prelude::*;

#[derive(Debug, Queryable, Selectable, Identifiable, PartialEq)]
#[diesel(table_name = addresses)]
#[diesel(primary_key(address_id))]
pub struct Address {
    pub address_id: i32,
    pub country: String,
    pub city: String,
    pub city_part: Option<String>,
    pub postal_code: Option<String>,
    pub street: String,
    pub house_number: String,
    pub latitude: Option<f32>,
    pub longitude: Option<f32>,
}
