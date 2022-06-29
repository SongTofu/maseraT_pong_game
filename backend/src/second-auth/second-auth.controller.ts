import { Controller, Get, Param, UseGuards, Req } from "@nestjs/common";
import { SecondAuthService } from "./second-auth.service";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";

@Controller("second-auth")
@UseGuards(JwtAuthGuard)
export class SecondAuthController {
  constructor(private secondAuthServie: SecondAuthService) {}

  @Get()
  requestAuth(@Req() req): void {
    this.secondAuthServie.requestAuth(req.user.id);
  }

  @Get("/:code")
  checkAuth(
    @Param("code") code: string,
    @Req() req,
  ): Promise<{ matchCode: boolean }> {
    return this.secondAuthServie.checkAuth(req.user.id, code);
  }
}
