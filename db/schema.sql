-- One table for every enquiry form on the website. The `source` column says
-- which form a lead came from (see enquirySources in src/lib/enquiry.ts).
--
-- Run this once as an admin user (e.g. in phpMyAdmin or `mysql -u root -p`).
-- Change the database name, user name and host to match your server, and
-- replace the password with a long random one (e.g. `openssl rand -base64 32`).

CREATE DATABASE IF NOT EXISTS techcaddlucknow
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE techcaddlucknow;

CREATE TABLE IF NOT EXISTS enquiries (
  id          BIGINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  source      VARCHAR(32)      NOT NULL,
  name        VARCHAR(80)      NOT NULL,
  phone       CHAR(10)         NOT NULL,
  course      VARCHAR(150)     NULL,
  page        VARCHAR(255)     NULL,
  ip          VARCHAR(45)      NULL,
  user_agent  VARCHAR(255)     NULL,
  created_at  TIMESTAMP        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_created_at (created_at),
  KEY idx_phone (phone),
  KEY idx_source (source),
  CONSTRAINT chk_phone CHECK (phone REGEXP '^[6-9][0-9]{9}$')
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- The website also creates the database and this table by itself on the
-- first submission if they are missing (src/lib/enquiryDb.ts), so running the
-- CREATE DATABASE and CREATE TABLE above is optional. Only the user and grants
-- below are required.

-- Least-privilege account for the website. It can only create the database
-- and its tables, and add rows to `enquiries`: it cannot read, change, drop or delete leads, or touch
-- any other table, so even a leaked password or an injection bug cannot dump
-- or wipe the data.
-- Use your own admin login (not this one) to view the leads.
--
-- Replace '%' with the website server's IP address if you know it.
-- REQUIRE SSL refuses unencrypted connections; remove it only if the database
-- runs on the same machine as the website and DB_SSL=false.
CREATE USER IF NOT EXISTS 'techcadd_web'@'%'
  IDENTIFIED BY 'CHANGE_ME_TO_A_LONG_RANDOM_PASSWORD'
  REQUIRE SSL
  WITH MAX_USER_CONNECTIONS 10;

GRANT CREATE ON techcaddlucknow.* TO 'techcadd_web'@'%';
GRANT INSERT ON techcaddlucknow.enquiries TO 'techcadd_web'@'%';
