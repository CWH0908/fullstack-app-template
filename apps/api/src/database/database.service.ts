import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Kysely, MysqlDialect } from "kysely";
import { createPool, type Pool } from "mysql2";
import type { Database } from "./database.types";

@Injectable()
export class DatabaseService
  extends Kysely<Database>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pool: Pool;

  constructor(configService: ConfigService) {
    const databaseUrl = configService.getOrThrow<string>("DATABASE_URL");
    const url = new URL(databaseUrl);

    const database = url.pathname.replace(/^\//, "");
    if (!database) {
      throw new Error("DATABASE_URL must include a database name.");
    }

    const pool = createPool({
      host: url.hostname,
      port: url.port ? Number(url.port) : 3306,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database,
      connectionLimit: Number(url.searchParams.get("connectionLimit") ?? 10),
      timezone: "Z"
    });

    super({
      dialect: new MysqlDialect({ pool })
    });

    this.pool = pool;
  }

  async onModuleInit() {
    await this.selectNoFrom((eb) => eb.val(1).as("ok")).executeTakeFirst();
  }

  async onModuleDestroy() {
    await this.destroy();
    this.pool.end();
  }
}
