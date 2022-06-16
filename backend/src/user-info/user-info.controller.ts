import { Controller, Get, Param } from "@nestjs/common";
import { UserInfoService } from "./user-info.service";
import { MyUserInfoDto } from "./dto/my-user-info.dto";

@Controller("user-info")
export class UserInfoController {
  constructor(private userInfoService: UserInfoService) {}

  @Get()
  getMyInfo(): Promise<MyUserInfoDto> {
    return this.userInfoService.getMyInfo(1); //나중에 본인id 넣으면 된다.
  }
  @Get("/:userId")
  targetInfo(@Param("userId") targetId: number) {
    return this.userInfoService.targetInfo(1, targetId);
  }
}
