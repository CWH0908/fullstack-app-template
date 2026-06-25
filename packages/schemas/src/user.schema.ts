import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  avatarUrl: z.string().optional(),
  role: z.enum(["user", "admin"]),
  createdAt: z.string()
});

export const updateUserProfileSchema = z.object({
  nickname: z.string().min(1).max(40),
  avatarUrl: z.string().url().optional()
});

export type UserDto = z.infer<typeof userSchema>;
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
