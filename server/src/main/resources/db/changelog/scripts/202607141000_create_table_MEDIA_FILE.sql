-- liquibase formatted sql
-- changeset nnvi:create_table_MEDIA_FILE

CREATE TABLE IF NOT EXISTS MEDIA_FILE (
    id BIGSERIAL PRIMARY KEY,
    journey_id BIGINT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    mime_type VARCHAR(100) NOT NULL,
    file_type VARCHAR(20) NOT NULL,
    storage_type VARCHAR(20) NOT NULL,
    url VARCHAR(1000) NOT NULL,
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    version INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- rollback DROP TABLE MEDIA_FILE;
