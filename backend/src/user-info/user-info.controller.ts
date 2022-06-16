import { Controller, Get, Param } from "@nestjs/common";
import { UserInfoService } from "./user-info.service";

@Controller("user-info")
export class UserInfoController {
  constructor(private userInfoService: UserInfoService) {}

  @Get("/:userId")
  targetInfo(@Param("userId") targetId: number) {
    return this.userInfoService.targetInfo(1, targetId);
  }
}
