import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/login")
  @UseGuards(AuthGuard("jwt"))
  async logIn(@Req() req) {
    return this.authService.logIn(req.user);
  }
}
