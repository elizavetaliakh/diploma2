create sequence if not exists users_id_sequence start 1;
create sequence if not exists query_id_sequence start 1;
create sequence if not exists client_id_sequence start 1;
create sequence if not exists service_id_sequence start 1;
create sequence if not exists onetime_service_id_sequence start 1;

CREATE TABLE IF NOT EXISTS users(
    user_id INTEGER PRIMARY KEY default nextval('users_id_sequence'),
    user_role VARCHAR(10) NOT NULL,
    user_name text NOT NULL,
    user_password text NOT NULL,
    registration_date DATE NOT NULL
);
CREATE TABLE IF NOT EXISTS queries(
    query_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    query_definition TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS clients(
    client_id INTEGER PRIMARY KEY,
    client_full_name text NOT NULL,
    birth_date DATE NOT NULL,
    client_phone_number text NOT NULL,
    client_email text NOT NULL,
    passport_number text NOT NULL
);
CREATE TABLE IF NOT EXISTS services(
    service_id INTEGER PRIMARY KEY,
    service_name text NOT NULL,
    service_price NUMERIC(24,2) NOT NULL,
    product_type text NOT NULL,
    service_description text NOT NULL
);
CREATE TABLE IF NOT EXISTS onetime_service(
    onetime_service_id INTEGER PRIMARY KEY,
    service_id INTEGER NOT NULL,
    client_id INTEGER NOT NULL,
    acception_date DATE NOT NULL,
    deadline_date DATE NOT NULL,
    responsible_employee text NOT NULL
);