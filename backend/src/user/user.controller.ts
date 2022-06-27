import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { MyUserInfoDto } from "./dto/my-user-info.dto";
import { TargetUserInfoDto } from "./dto/target-user-info.dto";
import { UpdateUserInfoDto } from "./dto/update-user-info.dto";
import { User } from "./entity/user.entity";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";

const storage = diskStorage({
  destination: "./img",
  filename: (req, file, cb) => {
    const filename = Date.now() + file.originalname;
    cb(null, filename);
  },
});

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getMyInfo(): Promise<MyUserInfoDto> {
    return this.userService.getMyInfo(1); //나중에 본인id 넣으면 된다.
  }

  @Get("/info/:userId")
  targetInfo(@Param("userId") targetId: number): Promise<TargetUserInfoDto> {
    return this.userService.targetInfo(1, targetId);
  }

  @Patch("/info")
  @UseInterceptors(FileInterceptor("profile", {}))
  updateUser(@Body() updateUserInfoDto: UpdateUserInfoDto) {
    return this.userService.updateUser(2, updateUserInfoDto);
  }

  @Post("/info")
  initUserInfo(@Body() updateUserInfoDto: UpdateUserInfoDto): Promise<User> {
    console.log(updateUserInfoDto);
    return this.userService.initUserInfo(1, updateUserInfoDto); //본인아이디, 바꿀 닉네임, 바꿀 프로필
    //리턴값 미정
  }
}
