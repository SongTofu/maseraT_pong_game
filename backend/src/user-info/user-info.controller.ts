import { Controller, Get, Param, Patch, Body } from "@nestjs/common";
import { UserInfoService } from "./user-info.service";
import { MyUserInfoDto } from "./dto/my-user-info.dto";
import { TargetUserInfoDto } from "./dto/target-user-info.dto";
import { UpdateUserInfoDto } from "./dto/update-user-info.dto";

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
}
