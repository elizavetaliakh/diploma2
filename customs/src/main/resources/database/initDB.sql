create sequence if not exists users_id_seq;

CREATE TABLE IF NOT EXISTS users(
    user_id INTEGER PRIMARY KEY,
    user_role VARCHAR(20) NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    user_password VARCHAR(8) NOT NULL,
    registration_date DATE NOT NULL
);