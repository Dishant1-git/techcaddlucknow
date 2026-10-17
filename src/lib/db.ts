// Server-only MySQL connection pool. Credentials come from the environment
// (see .env.example) and are never sent to the browser.
//
// Hardening, in short:
//  - every query goes through execute() with `?` placeholders (server-side
//    prepared statements), so user input is never part of the SQL text;
//  - multi-statement queries and LOAD DATA LOCAL INFILE are switched off at the
//    protocol level, so even a mistake in a query cannot chain `; DROP ...` or
//    read files from this server;
//  - the connection is TLS-encrypted with certificate verification unless
//    DB_SSL=false (only for a database on the same machine);
//  - the app should log in as a user that can only create the database and
//    table and INSERT into `enquiries` (see db/schema.sql), so a leaked
//    password cannot read or delete leads.
//
// The pool connects without selecting a database, so the site still works
// when the database does not exist yet; queries name it via dbName().
import "server-only";
import mysql, { type Pool } from "mysql2/promise";

export class DbConfigError extends Error {}

/**
 * DB_NAME (default "techcaddlucknow"), backtick-quoted for use in SQL. A
 * database name cannot be a `?` placeholder, so it is limited to letters,
 * digits and underscores.
 */
export function dbName() {
  const name = process.env.DB_NAME || "techcaddlucknow";
  if (!/^[A-Za-z0-9_]{1,64}$/.test(name)) {
    throw new DbConfigError("DB_NAME may contain only letters, digits and underscores");
  }
  return `\`${name}\``;
}

// Reuse one pool across hot reloads in development.
const globalForDb = globalThis as typeof globalThis & { mysqlPool?: Pool };

function sslOptions() {
  if (process.env.DB_SSL === "false") {
    if (process.env.NODE_ENV === "production" && !["localhost", "127.0.0.1", "::1"].includes(process.env.DB_HOST ?? "")) {
      throw new DbConfigError("DB_SSL=false is only allowed for a database on localhost");
    }
    return undefined;
  }
  // DB_SSL_CA: the provider's CA certificate (PEM). "\n" escapes are allowed so it fits on one line.
  const ca = process.env.DB_SSL_CA?.replace(/\\n/g, "\n");
  return { rejectUnauthorized: true, minVersion: "TLSv1.2" as const, ...(ca ? { ca } : {}) };
}

export function getPool(): Pool {
  if (globalForDb.mysqlPool) return globalForDb.mysqlPool;

  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env;
  if (!DB_HOST || !DB_USER || !DB_PASSWORD) {
    throw new DbConfigError("DB_HOST, DB_USER and DB_PASSWORD must be set");
  }

  const pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT ? Number(DB_PORT) : 3306,
    user: DB_USER,
    password: DB_PASSWORD,
    ssl: sslOptions(),
    charset: "utf8mb4",
    multipleStatements: false,
    flags: ["-LOCAL_FILES", "-MULTI_STATEMENTS"],
    connectionLimit: 5,
    maxIdle: 5,
    idleTimeout: 60_000,
    connectTimeout: 10_000,
    enableKeepAlive: true,
  });
  globalForDb.mysqlPool = pool;
  return pool;
}
