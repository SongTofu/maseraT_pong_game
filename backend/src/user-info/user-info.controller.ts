import { Controller, Get, Param } from "@nestjs/common";
import { UserInfoService } from "./user-info.service";

@Controller("user-info")
export class UserInfoController {
  constructor(private userInfoService: UserInfoService) {}

  @Get("/:userId")
  targetInfo(@Param("userId") userId: number) {
    this.userInfoService.targetInfo(userId, 1);
  }
}
