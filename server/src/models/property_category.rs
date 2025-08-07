use crate::schema::property_categories;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Queryable, Identifiable, Serialize, Deserialize)]
#[diesel(table_name = property_categories)]
pub struct PropertyCategory {
    pub id: i32,
    pub name: String,
}
