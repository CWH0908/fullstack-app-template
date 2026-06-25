import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { updateUserProfileSchema } from "@template/schemas";
import type { UpdateUserProfileInput } from "@template/schemas";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import type { AuthenticatedRequest } from "../common/guards/jwt-auth.guard";
import { UsersService } from "./users.service";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  async getMe(@Req() request: AuthenticatedRequest) {
    const data = await this.usersService.getById(request.auth!.userId);

    return { success: true, data };
  }

  @Patch("me")
  async updateMe(@Req() request: AuthenticatedRequest, @Body() body: UpdateUserProfileInput) {
    const input = updateUserProfileSchema.parse(body);
    const data = await this.usersService.updateProfile(request.auth!.userId, input);

    return { success: true, data };
  }
}
