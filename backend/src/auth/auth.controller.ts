import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/user.dto";
import { ftAuthGuard } from "./guard/ft-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("/login")
  @UseGuards(ftAuthGuard)
  async logIn(@Req() req): Promise<any> {
    const userDto: UserDto = req.user;

    return this.authService.logIn(userDto);
  }
}
