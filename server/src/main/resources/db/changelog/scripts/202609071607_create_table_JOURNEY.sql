-- liquibase formatted sql
-- changeset nnvi:create_table_JOURNEY

CREATE TABLE IF NOT EXISTS JOURNEY (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    country VARCHAR(255),
    place VARCHAR(255),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    currency VARCHAR(10),
    amount BIGINT,
    status VARCHAR(20),
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- rollback DROP TABLE JOURNEY;
