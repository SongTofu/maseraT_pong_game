import { Controller, Get, Param } from "@nestjs/common";
import { SecondAuthService } from "./second-auth.service";

@Controller("second-auth")
export class SecondAuthController {
  constructor(private secondAuthServie: SecondAuthService) {}

  @Get()
  requestAuth(): void {
    this.secondAuthServie.requestAuth("aa");
  }

  @Get("/:code")
  checkAuth(@Param("code") code: string): Promise<{ matchCode: boolean }> {
    return this.secondAuthServie.checkAuth("aa", code);
  }
}
