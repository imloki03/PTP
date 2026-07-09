-- liquibase formatted sql
-- changeset nnvi:create_table_COUNTRY

CREATE TABLE IF NOT EXISTS COUNTRY (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    version INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- rollback DROP TABLE COUNTRY;
