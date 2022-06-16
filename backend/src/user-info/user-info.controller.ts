import { Controller, Get } from "@nestjs/common";
import { UserInfoService } from "./user-info.service";
import { MyUserInfoDto } from "./dto/my-user-info.dto";

@Controller("user-info")
export class UserInfoController {
  constructor(private userInfoService: UserInfoService) {}

  @Get()
  getMyInfo(): Promise<MyUserInfoDto> {
    return this.userInfoService.getMyInfo(1);
  }
}
