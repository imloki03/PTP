-- liquibase formatted sql
-- changeset nnvi:insert_table_PLACE

INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'New York', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'US';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Los Angeles', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'US';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Chicago', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'US';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Houston', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'US';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'San Francisco', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'US';

INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'London', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'GB';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Manchester', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'GB';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Birmingham', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'GB';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Liverpool', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'GB';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Edinburgh', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'GB';

INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Tokyo', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'JP';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Osaka', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'JP';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Kyoto', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'JP';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Yokohama', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'JP';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Sapporo', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'JP';

INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Zurich', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'CH';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Geneva', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'CH';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Bern', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'CH';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Basel', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'CH';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Lausanne', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'CH';

INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Toronto', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'CA';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Vancouver', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'CA';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Montreal', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'CA';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Calgary', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'CA';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Ottawa', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'CA';

INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Sydney', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'AU';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Melbourne', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'AU';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Brisbane', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'AU';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Perth', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'AU';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Adelaide', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'AU';

INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Hanoi', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'VN';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Ho Chi Minh City', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'VN';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Da Nang', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'VN';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Hai Phong', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'VN';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Nha Trang', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'VN';

INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Paris', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'FR';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Marseille', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'FR';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Lyon', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'FR';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Toulouse', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'FR';
INSERT INTO PLACE (name, country_id, version, created_at, updated_at)
    SELECT 'Nice', id, 0, NOW(), NOW() FROM COUNTRY WHERE code = 'FR';

-- rollback DELETE FROM PLACE;
