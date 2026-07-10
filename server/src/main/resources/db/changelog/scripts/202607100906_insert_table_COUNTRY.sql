-- liquibase formatted sql
-- changeset nnvi:insert_table_COUNTRY

INSERT INTO COUNTRY (code, name, version, created_at, updated_at) VALUES
    ('VN', 'Vietnam', 0, NOW(), NOW()),
    ('US', 'United States', 0, NOW(), NOW()),
    ('GB', 'United Kingdom', 0, NOW(), NOW()),
    ('JP', 'Japan', 0, NOW(), NOW()),
    ('CH', 'Switzerland', 0, NOW(), NOW()),
    ('CA', 'Canada', 0, NOW(), NOW()),
    ('AU', 'Australia', 0, NOW(), NOW()),
    ('FR', 'France', 0, NOW(), NOW());

-- rollback DELETE FROM COUNTRY WHERE code IN ('US','GB','JP','CH','CA','AU','VN','FR');
