import { Controller, Get, Req, UseGuards, Redirect, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/user.dto";
import { ftAuthGuard } from "./guard/ft-auth.guard";
import { Response } from "express";
import { SecondAuthService } from "src/second-auth/second-auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private secondAuthService: SecondAuthService,
  ) {}

  @Get("/login")
  @UseGuards(ftAuthGuard)
  async logIn(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const userDto: UserDto = req.user;

    await this.authService.logIn(userDto).then((data) => {
      res.cookie("token", data.token);
      res.cookie("nickname", data.nickname);
      res.cookie("id", data.userId);
      if (data.firstLogin) {
        res.cookie("isLogin", "1");
        res.redirect(process.env.FE_URL + "login");
      } else {
        if (data.secondAuth) {
          this.secondAuthService.requestAuth(data.userId);
          res.redirect(process.env.FE_URL + "second-auth");
        } else {
          res.cookie("isLogin", "1");
          res.redirect(process.env.FE_URL + "game");
        }
      }
    });
  }
}
