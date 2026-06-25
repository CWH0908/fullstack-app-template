import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { config } from "dotenv";
import { createConnection } from "mysql2/promise";

config({ path: resolve(__dirname, "../../../../.env") });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required.");
}

const url = new URL(databaseUrl);
const database = url.pathname.replace(/^\//, "");

if (!database) {
  throw new Error("DATABASE_URL must include a database name.");
}

const quoteIdentifier = (value: string) => `\`${value.replace(/`/g, "``")}\``;

async function main() {
  const baseConfig = {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    multipleStatements: true
  };

  const bootstrap = await createConnection(baseConfig);
  await bootstrap.query(
    `CREATE DATABASE IF NOT EXISTS ${quoteIdentifier(
      database
    )} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await bootstrap.end();

  const schemaPath = resolve(__dirname, "../../../../scripts/mysql/schema.sql");
  const schema = await readFile(schemaPath, "utf8");

  const connection = await createConnection({
    ...baseConfig,
    database
  });
  await connection.query(schema);
  await connection.end();

  console.log(`MySQL database initialized: ${database}`);
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
