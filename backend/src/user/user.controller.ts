import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/signup")
  signUp(@Body() nickname: string) {
    return this.userService.signUp(nickname);
  }
}
