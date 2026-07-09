-- liquibase formatted sql

-- changeset ptp:create-sample-table
CREATE TABLE IF NOT EXISTS sample (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL
);
-- rollback DROP TABLE sample;
