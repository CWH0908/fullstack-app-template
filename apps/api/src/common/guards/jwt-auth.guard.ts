import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Request } from "express";

export type AuthenticatedRequest = Request & {
  auth?: JwtPayload;
};

type JwtPayload = {
  userId: string;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException("未登录");
    }

    try {
      request.auth = await this.jwtService.verifyAsync<JwtPayload>(token);
      return true;
    } catch {
      throw new UnauthorizedException("登录已失效");
    }
  }

  private extractToken(request: Request): string | undefined {
    const authorization = request.headers.authorization;
    const [type, token] = authorization?.split(" ") ?? [];

    return type === "Bearer" ? token : undefined;
  }
}
