All my tables: CREATE TABLE IF NOT EXISTS public.addresses
(
    address_id integer NOT NULL DEFAULT nextval('addresses_address_id_seq'::regclass),
    country character varying(64) COLLATE pg_catalog."default" NOT NULL,
    city character varying(64) COLLATE pg_catalog."default" NOT NULL,
    city_part character varying(64) COLLATE pg_catalog."default",
    postal_code character varying(64) COLLATE pg_catalog."default",
    street character varying(64) COLLATE pg_catalog."default" NOT NULL,
    house_number character varying(32) COLLATE pg_catalog."default" NOT NULL,
    latitude real NOT NULL,
    longitude real NOT NULL,
    CONSTRAINT addresses_pkey PRIMARY KEY (address_id)
)
CREATE TABLE IF NOT EXISTS public.images
(
    image_id integer NOT NULL DEFAULT nextval('images_image_id_seq'::regclass),
    id_in_property integer NOT NULL,
    width integer NOT NULL,
    height integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    fk_property_id integer,
    fk_image_format_id integer,
    CONSTRAINT images_pkey PRIMARY KEY (image_id),
    CONSTRAINT fk_images_format FOREIGN KEY (fk_image_format_id)
        REFERENCES public.image_formats (format_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL,
    CONSTRAINT images_property_property_id_fkey FOREIGN KEY (fk_property_id)
        REFERENCES public.properties (property_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.images
    OWNER to "RE_Market_user";TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.addresses
    OWNER to postgres;
CREATE TABLE IF NOT EXISTS public.image_formats
(
    format_id integer NOT NULL DEFAULT nextval('image_formats_format_id_seq'::regclass),
    name character varying(4) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT image_formats_pkey PRIMARY KEY (format_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.image_formats
    OWNER to postgres;
CREATE TABLE IF NOT EXISTS public.login_options
(
    login_option_id integer NOT NULL DEFAULT nextval('login_options_login_option_id_seq'::regclass),
    name character varying(32) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT login_options_pkey PRIMARY KEY (login_option_id),
    CONSTRAINT login_options_name_key UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.login_options
    OWNER to "RE_Market_user";
CREATE TABLE IF NOT EXISTS public.pay_types
(
    id integer NOT NULL DEFAULT nextval('pay_types_id_seq'::regclass),
    name character varying(16) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pay_types_pkey PRIMARY KEY (id),
    CONSTRAINT pay_types_name_key UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.pay_types
    OWNER to postgres;
CREATE TABLE IF NOT EXISTS public.properties
(

    property_id integer NOT NULL DEFAULT nextval('properties_property_id_seq'::regclass),
    uuid character varying(255) COLLATE pg_catalog."default",
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    fk_user_id integer,
    description text COLLATE pg_catalog."default",
    price integer,
    status character varying(255) COLLATE pg_catalog."default",
    yearly_tax numeric,
    after_price character varying(255) COLLATE pg_catalog."default",
    images_count integer,
    custom_id character varying(255) COLLATE pg_catalog."default",
    size integer,
    room_count integer,
    bedroom_count integer,
    bathroom_count integer,
    garage_count integer,
    year_built date,
    available_from date,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    fk_address_id integer,
    fk_property_category_id integer,
    fk_pay_type_id integer,
    CONSTRAINT properties_pkey PRIMARY KEY (property_id),
    CONSTRAINT properties_uuid_key UNIQUE (uuid),
    CONSTRAINT fk_pay_type FOREIGN KEY (fk_pay_type_id)
        REFERENCES public.pay_types (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_properties_address FOREIGN KEY (fk_address_id)
        REFERENCES public.addresses (address_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL,
    CONSTRAINT fk_property_category FOREIGN KEY (fk_property_category_id)
        REFERENCES public.property_categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT properties_fk_user_id_fkey FOREIGN KEY (fk_user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.properties
    OWNER to "RE_Market_user";
CREATE TABLE IF NOT EXISTS public.property_categories
(
    id integer NOT NULL DEFAULT nextval('property_categories_id_seq'::regclass),
    name character varying(16) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT property_categories_pkey PRIMARY KEY (id),
    CONSTRAINT property_categories_name_key UNIQUE (name)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.property_categories
    OWNER to postgres;
CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL DEFAULT nextval('users_user_id_seq'::regclass),
    email character varying(255) COLLATE pg_catalog."default",
    fk_login_option_id integer,
    first_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default",
    birth_date date,
    company_name character varying(255) COLLATE pg_catalog."default",
    "position" character varying(255) COLLATE pg_catalog."default",
    profile_picture_path character varying(255) COLLATE pg_catalog."default" DEFAULT 'defaultAgent/ludek.jpg'::character varying,
    facebook_url character varying(255) COLLATE pg_catalog."default",
    instagram_url character varying(255) COLLATE pg_catalog."default",
    twitter_url character varying(255) COLLATE pg_catalog."default",
    linkedin_url character varying(255) COLLATE pg_catalog."default",
    website_url character varying(255) COLLATE pg_catalog."default",
    mobile_phone character varying(32) COLLATE pg_catalog."default",
    about_me text COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    uuid character varying(255) COLLATE pg_catalog."default",
    fk_address_id integer,
    office_phone character varying(32) COLLATE pg_catalog."default",
    is_admin boolean DEFAULT false,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT fk_users_address FOREIGN KEY (fk_address_id)
        REFERENCES public.addresses (address_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL,
    CONSTRAINT users_fk_login_option_id_fkey FOREIGN KEY (fk_login_option_id)
        REFERENCES public.login_options (login_option_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to "RE_Market_user";
