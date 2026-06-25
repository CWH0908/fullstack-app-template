import { z } from "zod";

export const loginByWechatCodeSchema = z.object({
  code: z.string().min(1, "微信登录 code 不能为空")
});

export const loginResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.string(),
    nickname: z.string(),
    avatarUrl: z.string().optional(),
    role: z.enum(["user", "admin"]),
    createdAt: z.string()
  })
});

export type LoginByWechatCodeInput = z.infer<typeof loginByWechatCodeSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
