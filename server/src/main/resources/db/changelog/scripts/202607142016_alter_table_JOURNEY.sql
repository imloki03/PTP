-- liquibase formatted sql
-- changeset nnvi:alter_table_JOURNEY_add_first_image
-- comment: add first image

ALTER TABLE JOURNEY ADD COLUMN IF NOT EXISTS first_image_id BIGINT;
ALTER TABLE JOURNEY ADD COLUMN IF NOT EXISTS first_image_url VARCHAR(1000);
ALTER TABLE JOURNEY ADD COLUMN IF NOT EXISTS first_image_storage_type VARCHAR(20);

-- rollback ALTER TABLE JOURNEY DROP COLUMN first_image_storage_type;
-- rollback ALTER TABLE JOURNEY DROP COLUMN first_image_url;
-- rollback ALTER TABLE JOURNEY DROP COLUMN first_image_id;
