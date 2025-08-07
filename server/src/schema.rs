diesel::table! {
    addresses (address_id) {
        address_id -> Int4,
        #[max_length = 64]
        country -> Varchar,
        #[max_length = 64]
        city -> Varchar,
        #[max_length = 64]
        city_part -> Nullable<Varchar>,
        #[max_length = 64]
        postal_code -> Nullable<Varchar>,
        #[max_length = 64]
        street -> Varchar,
        #[max_length = 32]
        house_number -> Varchar,
        latitude -> Nullable<Float4>,
        longitude -> Nullable<Float4>,
    }
}

diesel::table! {
    image_formats (format_id) {
        format_id -> Int4,
        #[max_length = 4]
        name -> Varchar,
    }
}

diesel::table! {
    images (image_id) {
        image_id -> Int4,
        id_in_property -> Int4,
        width -> Int4,
        height -> Int4,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
        fk_property_id -> Nullable<Int4>,
        fk_image_format_id -> Nullable<Int4>,
    }
}

diesel::table! {
    login_options (login_option_id) {
        login_option_id -> Int4,
        #[max_length = 32]
        name -> Varchar,
    }
}

diesel::table! {
    pay_types (id) {
        id -> Int4,
        #[max_length = 16]
        name -> Varchar,
    }
}

diesel::table! {
    properties (property_id) {
        property_id -> Int4,
        #[max_length = 255]
        uuid -> Nullable<Varchar>,
        #[max_length = 255]
        title -> Varchar,
        fk_user_id -> Int4,
        description -> Nullable<Text>,
        price -> Nullable<Int4>,
        #[max_length = 255]
        status -> Nullable<Varchar>,
        yearly_tax -> Nullable<Numeric>,
        #[max_length = 255]
        after_price -> Nullable<Varchar>,
        images_count -> Nullable<Int4>,
        #[max_length = 255]
        custom_id -> Nullable<Varchar>,
        size -> Nullable<Int4>,
        room_count -> Nullable<Int4>,
        bedroom_count -> Nullable<Int4>,
        bathroom_count -> Nullable<Int4>,
        garage_count -> Nullable<Int4>,
        year_built -> Nullable<Date>,
        available_from -> Nullable<Date>,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
        fk_address_id -> Nullable<Int4>,
        fk_property_category_id -> Nullable<Int4>,
        fk_pay_type_id -> Nullable<Int4>,
    }
}

diesel::table! {
    property_categories (id) {
        id -> Int4,
        #[max_length = 16]
        name -> Varchar,
    }
}

diesel::table! {
    users (user_id) {
        user_id -> Int4,
        #[max_length = 255]
        email -> Varchar,
        fk_login_option_id -> Nullable<Int4>,
        #[max_length = 255]
        first_name -> Varchar,
        #[max_length = 255]
        last_name -> Varchar,
        #[max_length = 255]
        password -> Nullable<Varchar>,
        birth_date -> Nullable<Date>,
        #[max_length = 255]
        company_name -> Nullable<Varchar>,
        #[max_length = 255]
        position -> Nullable<Varchar>,
        #[max_length = 255]
        profile_picture_path -> Nullable<Varchar>,
        #[max_length = 255]
        facebook_url -> Nullable<Varchar>,
        #[max_length = 255]
        instagram_url -> Nullable<Varchar>,
        #[max_length = 255]
        twitter_url -> Nullable<Varchar>,
        #[max_length = 255]
        linkedin_url -> Nullable<Varchar>,
        #[max_length = 255]
        website_url -> Nullable<Varchar>,
        #[max_length = 32]
        mobile_phone -> Nullable<Varchar>,
        about_me -> Nullable<Text>,
        created_at -> Timestamptz,
        updated_at -> Timestamptz,
        #[max_length = 255]
        uuid -> Nullable<Varchar>,
        fk_address_id -> Nullable<Int4>,
        #[max_length = 32]
        office_phone -> Nullable<Varchar>,
        is_admin -> Nullable<Bool>,
    }
}

diesel::joinable!(images -> image_formats (fk_image_format_id));
diesel::joinable!(images -> properties (fk_property_id));
diesel::joinable!(properties -> addresses (fk_address_id));
diesel::joinable!(properties -> pay_types (fk_pay_type_id));
diesel::joinable!(properties -> property_categories (fk_property_category_id));
diesel::joinable!(properties -> users (fk_user_id));
diesel::joinable!(users -> addresses (fk_address_id));
diesel::joinable!(users -> login_options (fk_login_option_id));

diesel::allow_tables_to_appear_in_same_query!(
    addresses,
    image_formats,
    images,
    login_options,
    pay_types,
    properties,
    property_categories,
    users,
);
