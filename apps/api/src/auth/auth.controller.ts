import { Body, Controller, Post } from "@nestjs/common";
import { loginByWechatCodeSchema } from "@template/schemas";
import type { LoginByWechatCodeInput } from "@template/schemas";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("wechat")
  async loginByWechatCode(@Body() body: LoginByWechatCodeInput) {
    const input = loginByWechatCodeSchema.parse(body);
    const data = await this.authService.loginByWechatCode(input);

    return { success: true, data };
  }
}
