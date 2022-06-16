import { Controller, Get, Param, Post } from "@nestjs/common";
import { UserInfoService } from "./user-info.service";
import { MyUserInfoDto } from "./dto/my-user-info.dto";
import { User } from "./user.entity";

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

  @Post()
  initUserInfo(): Promise<User> {
    return this.userInfoService.initUserInfo(1, "korea", "profile"); //본인아이디, 바꿀 닉네임, 바꿀 프로필
    //리턴값 미정
  }
}
