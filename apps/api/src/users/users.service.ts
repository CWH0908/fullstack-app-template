import { Injectable, NotFoundException } from "@nestjs/common";
import type { UpdateUserProfileInput, UserDto } from "@template/schemas";
import { DatabaseService } from "../database/database.service";
import type { UserRow } from "../database/database.types";

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async getById(userId: string): Promise<UserDto> {
    const user = await this.db
      .selectFrom("users")
      .select(["id", "nickname", "avatar_url", "role", "created_at"])
      .where("id", "=", userId)
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundException("用户不存在");
    }

    return this.toDto(user);
  }

  async updateProfile(userId: string, input: UpdateUserProfileInput): Promise<UserDto> {
    await this.db
      .updateTable("users")
      .set({
        nickname: input.nickname,
        avatar_url: input.avatarUrl ?? null
      })
      .where("id", "=", userId)
      .executeTakeFirst();

    const user = await this.db
      .selectFrom("users")
      .select(["id", "nickname", "avatar_url", "role", "created_at"])
      .where("id", "=", userId)
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundException("用户不存在");
    }

    return this.toDto(user);
  }

  private toDto(
    user: Pick<UserRow, "id" | "nickname" | "avatar_url" | "role" | "created_at">
  ): UserDto {
    return {
      id: user.id,
      nickname: user.nickname,
      avatarUrl: user.avatar_url ?? undefined,
      role: user.role,
      createdAt: user.created_at.toISOString()
    };
  }
}
