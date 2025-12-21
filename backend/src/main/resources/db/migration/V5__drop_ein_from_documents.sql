ALTER TABLE companies DROP COLUMN IF EXISTS ein_number;

ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS middle_name VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name VARCHAR(100);

ALTER TABLE documents ALTER COLUMN uploaded_by_user_id TYPE varchar(255) USING uploaded_by_user_id::varchar(255);
