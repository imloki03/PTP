-- liquibase formatted sql
-- changeset nnvi:insert_table_CURRENCY

INSERT INTO CURRENCY (code, name, version, created_at, updated_at) VALUES
    ('VND', 'Vietnamese Dong', 0, NOW(), NOW()),
    ('USD', 'US Dollar', 0, NOW(), NOW()),
    ('EUR', 'Euro', 0, NOW(), NOW()),
    ('GBP', 'British Pound', 0, NOW(), NOW()),
    ('JPY', 'Japanese Yen', 0, NOW(), NOW()),
    ('CHF', 'Swiss Franc', 0, NOW(), NOW()),
    ('CAD', 'Canadian Dollar', 0, NOW(), NOW()),
    ('AUD', 'Australian Dollar', 0, NOW(), NOW());

-- rollback DELETE FROM CURRENCY WHERE code IN ('USD','EUR','GBP','JPY','CHF','CAD','AUD','VND');
