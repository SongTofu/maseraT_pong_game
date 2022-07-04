import { Controller, Get, Req, UseGuards, Redirect, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/user.dto";
import { ftAuthGuard } from "./guard/ft-auth.guard";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get("/login")
  // @Redirect("http://localhost:3001/login")
  // @UseGuards(ftAuthGuard)
  // async logIn(
  //   @Req() req,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<any> {
  //   const userDto: UserDto = req.user;

  //   const accessToken: string = await this.authService.logIn(userDto);
  //   res.cookie("token", accessToken);
  // }

  @Get("/login")
  @UseGuards(ftAuthGuard)
  async test(@Req() req): Promise<any> {
    const userDto: UserDto = req.user;

    return await this.authService.logIn(userDto);
  }
}
