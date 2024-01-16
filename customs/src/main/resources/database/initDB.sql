create sequence if not exists users_id_sequence start 1;
create sequence if not exists query_id_sequence start 1;

CREATE TABLE IF NOT EXISTS users(
    user_id INTEGER PRIMARY KEY default nextval('users_id_seq'),
    user_role VARCHAR(20) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_password VARCHAR(8) NOT NULL,
    registration_date DATE NOT NULL
);
CREATE TABLE IF NOT EXISTS queries(
    query_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    query_definition TEXT NOT NULL
);