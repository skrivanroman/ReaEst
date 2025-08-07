use crate::schema::login_options;
use diesel::prelude::*;

#[derive(Debug, Queryable, Identifiable)]
#[diesel(table_name = login_options)]
#[diesel(primary_key(login_option_id))]
pub struct LoginOption {
    pub login_option_id: i32,
    pub name: String,
}
