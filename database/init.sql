DROP TABLE IF EXISTS "item";
-- Create Table item
CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    task VARCHAR(250) NOT NULL,
    priority NUMERIC NOT NULL,
    date TIMESTAMP DEFAULT NOW()
);
-- Insert initial set of items
INSERT INTO item (task, priority, date)
VALUES ('Prepare Coffee', 1, '2021-05-01'),
    ('Boil Eggs', 2, '2021-05-01'),
    ('Buy Milk', 3, '2021-05-01') ON CONFLICT DO NOTHING;
DROP TABLE IF EXISTS "user";
-- Create Table user
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL
);
-- Insert initial set of users
INSERT INTO "user" (first_name, last_name)
VALUES ('John', 'Doe'),
    ('Brad', 'Gabson'),
    ('Allen', 'Ray') ON CONFLICT DO NOTHING;