import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { LoginByWechatCodeInput, LoginResponse } from "@template/schemas";
import { sql } from "kysely";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly db: DatabaseService
  ) {}

  async loginByWechatCode(input: LoginByWechatCodeInput): Promise<LoginResponse> {
    // Template behavior: replace this mock openId with a real WeChat code2Session call.
    const openId = `mock-openid-${input.code}`;

    await this.db
      .insertInto("users")
      .values({
        id: randomUUID(),
        open_id: openId,
        nickname: "微信用户"
      })
      .onDuplicateKeyUpdate({
        updated_at: sql<Date>`updated_at`
      })
      .executeTakeFirst();

    const user = await this.db
      .selectFrom("users")
      .select(["id", "nickname", "avatar_url", "role", "created_at"])
      .where("open_id", "=", openId)
      .executeTakeFirstOrThrow();

    const token = await this.jwtService.signAsync({ userId: user.id });

    return {
      token,
      user: {
        id: user.id,
        nickname: user.nickname,
        avatarUrl: user.avatar_url ?? undefined,
        role: user.role,
        createdAt: user.created_at.toISOString()
      }
    };
  }
}
