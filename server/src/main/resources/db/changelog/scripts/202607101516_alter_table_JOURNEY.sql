-- liquibase formatted sql
-- changeset nnvi:alter_table_JOURNEY

ALTER TABLE JOURNEY DROP CONSTRAINT fk_journey_country;
ALTER TABLE JOURNEY DROP COLUMN country_id;

-- rollback ALTER TABLE JOURNEY ADD COLUMN country_id BIGINT;
-- rollback ALTER TABLE JOURNEY ADD CONSTRAINT fk_journey_country FOREIGN KEY (country_id) REFERENCES COUNTRY(id);
