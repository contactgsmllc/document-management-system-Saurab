CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS companies (
	id bigserial NOT NULL,
	address varchar(255) NULL,
	contact_person varchar(255) NULL,
	created_at timestamptz(6) NOT NULL,
	email varchar(255) NULL,
	"name" varchar(255) NULL,
	phone varchar(255) NULL,
	state varchar(255) NULL,
	status varchar(255) NOT NULL,
	zip_code varchar(255) NULL,
	CONSTRAINT companies_pkey PRIMARY KEY (id),
	CONSTRAINT companies_status_check CHECK (((status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'INACTIVE'::character varying])::text[])))
);

CREATE TABLE IF NOT EXISTS users (
	id bigserial NOT NULL,
	approved bool NOT NULL,
	created_at timestamptz(6) NOT NULL,
	email varchar(255) NULL,
	first_name varchar(255) NULL,
	last_name varchar(255) NULL,
	middle_name varchar(255) NULL,
	"password" varchar(255) NULL,
	status varchar(255) NOT NULL,
	company_id int8 NULL,
	role_id int8 NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT users_status_check CHECK (((status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'INACTIVE'::character varying])::text[])))
);

ALTER TABLE public.users ADD CONSTRAINT fkin8gn4o1hpiwe6qe4ey7ykwq7 FOREIGN KEY (company_id) REFERENCES public.companies(id);
ALTER TABLE public.users ADD CONSTRAINT fkp56c1712k691lhsyewcssf40f FOREIGN KEY (role_id) REFERENCES public.roles(id);

CREATE TABLE IF NOT EXISTS documents (
	id bigserial NOT NULL,
	company_id int8 NULL,
	content_type varchar(255) NULL,
	description varchar(255) NULL,
	filename varchar(255) NULL,
	"path" varchar(255) NULL,
	"size" int8 NULL,
	status varchar(255) NOT NULL,
	storage_name varchar(255) NULL,
	uploaded_at timestamptz(6) NULL,
	uploaded_by_user_id varchar(255) NULL,
	CONSTRAINT documents_pkey PRIMARY KEY (id),
	CONSTRAINT documents_status_check CHECK (((status)::text = ANY ((ARRAY['ACTIVE'::character varying, 'INACTIVE'::character varying])::text[])))
);