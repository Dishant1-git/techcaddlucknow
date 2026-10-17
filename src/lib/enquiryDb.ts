// Saves enquiries to the single `enquiries` table. On the first submission it
// creates the database (DB_NAME, default "techcaddlucknow") and the table if
// either is missing. Server-only.
//
// That needs the app user to hold CREATE on this database (see db/schema.sql);
// it still cannot read, change, drop or delete anything.
import "server-only";
import { dbName, getPool } from "./db";
import type { EnquirySource } from "./enquiry";

// Keep in sync with db/schema.sql.
const createTable = (db: string) => `CREATE TABLE IF NOT EXISTS ${db}.enquiries (
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
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci`;

const insert = (db: string) =>
  `INSERT INTO ${db}.enquiries (source, name, phone, course, page, ip, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)`;

// What MySQL reports when the database or the table is missing.
const MISSING = new Set(["ER_BAD_DB_ERROR", "ER_NO_SUCH_TABLE"]);

export type Enquiry = {
  source: EnquirySource;
  name: string;
  phone: string;
  course: string;
  page: string | null;
  ip: string | null;
  userAgent: string | null;
};

// Shared so simultaneous first submissions create things only once.
let creating: Promise<void> | null = null;

async function createDatabaseAndTable(db: string) {
  const pool = getPool();
  await pool.query(`CREATE DATABASE IF NOT EXISTS ${db} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await pool.query(createTable(db));
  console.log(`Enquiry: database ${db} and enquiries table are ready`);
}

export async function saveEnquiry(e: Enquiry) {
  const pool = getPool();
  const db = dbName();
  const values = [e.source, e.name, e.phone, e.course, e.page, e.ip, e.userAgent];
  try {
    await pool.execute(insert(db), values);
  } catch (error) {
    if (!MISSING.has((error as { code?: string }).code ?? "")) throw error;
    creating ??= createDatabaseAndTable(db).finally(() => (creating = null));
    await creating;
    await pool.execute(insert(db), values);
  }
}
