import { Controller, Get, Param, Patch, Body, Post } from "@nestjs/common";
import { UserInfoService } from "./user-info.service";
import { MyUserInfoDto } from "./dto/my-user-info.dto";
import { TargetUserInfoDto } from "./dto/target-user-info.dto";
import { UpdateUserInfoDto } from "./dto/update-user-info.dto";
import { User } from "./user.entity";

@Controller("user-info")
export class UserInfoController {
  constructor(private userInfoService: UserInfoService) {}

  @Get()
  getMyInfo(): Promise<MyUserInfoDto> {
    return this.userInfoService.getMyInfo(1); //나중에 본인id 넣으면 된다.
  }

  @Get("/:userId")
  targetInfo(@Param("userId") targetId: number): Promise<TargetUserInfoDto> {
    return this.userInfoService.targetInfo(1, targetId);
  }

  @Patch()
  updateUser(@Body() updateUserInfoDto: UpdateUserInfoDto) {
    return this.userInfoService.updateUser(2, updateUserInfoDto);
  }

  @Post()
  initUserInfo(@Body() updateUserInfoDto: UpdateUserInfoDto): Promise<User> {
    return this.userInfoService.initUserInfo(1, updateUserInfoDto); //본인아이디, 바꿀 닉네임, 바꿀 프로필
    //리턴값 미정
  }
}
