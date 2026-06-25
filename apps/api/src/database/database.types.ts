import type { Generated, Selectable } from "kysely";

export type UserRole = "user" | "admin";

export interface UsersTable {
  id: string;
  open_id: string | null;
  nickname: string;
  avatar_url: string | null;
  role: Generated<UserRole>;
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}

export interface Database {
  users: UsersTable;
}

export type UserRow = Selectable<UsersTable>;
