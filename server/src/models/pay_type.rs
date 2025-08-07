use crate::schema::pay_types;
use diesel::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Queryable, Identifiable, Serialize, Deserialize)]
#[diesel(table_name = pay_types)]
pub struct PayType {
    pub id: i32,
    pub name: String,
}
