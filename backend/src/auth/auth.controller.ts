import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  // return requeset_uri
  // @Post("/login")
  // getToken(): Promise<string> {
  //   return this.authService.getToken();
  // }

  // // get accessToken, refreshToken
  // @Get("/auth")
  // logIn(): Promise<void> {
  //   return this.authService.logIn(token);
  // }
}
