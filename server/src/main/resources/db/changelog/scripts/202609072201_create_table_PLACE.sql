-- liquibase formatted sql
-- changeset nnvi:create_table_PLACE

CREATE TABLE IF NOT EXISTS PLACE (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country_id BIGINT NOT NULL,
    version INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    CONSTRAINT fk_place_country FOREIGN KEY (country_id) REFERENCES COUNTRY(id)
);

-- rollback DROP TABLE PLACE;
