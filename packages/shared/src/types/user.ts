export type UserRole = "user" | "admin";

export type User = {
  id: string;
  nickname: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
};
