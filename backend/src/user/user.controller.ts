import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  Post,
  UseInterceptors,
  UseGuards,
  Req,
  UploadedFile,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { MyUserInfoDto } from "./dto/my-user-info.dto";
import { TargetUserInfoDto } from "./dto/target-user-info.dto";
import { UpdateUserInfoDto } from "./dto/update-user-info.dto";
import { User } from "./user.entity";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetAllUserDto } from "./dto/get-all-user.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";

const storage = diskStorage({
  destination: "./img",
  filename: (req, file, cb) => {
    const filename = Date.now() + file.originalname;
    cb(null, filename);
  },
});

// @UseGuards(JwtAuthGuard)
@UseGuards(JwtAuthGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUser(): Promise<GetAllUserDto[]> {
    return this.userService.getAllUser();
  }

  @Get("info")
  getMyInfo(@Req() req): Promise<MyUserInfoDto> {
    return this.userService.getMyInfo(req.user.id); //나중에 본인id 넣으면 된다.
  }

  @Get("/info/:userId")
  targetInfo(
    @Param("userId") targetId: number,
    @Req() req,
  ): Promise<TargetUserInfoDto> {
    return this.userService.targetInfo(req.user.id, targetId);
  }

  @Patch("/info")
  @UseInterceptors(FileInterceptor("profile", { storage }))
  updateUser(
    @Body() updateUserInfoDto: UpdateUserInfoDto,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    updateUserInfoDto.profileImg = file.filename;
    return this.userService.updateUser(req.user.id, updateUserInfoDto);
  }

  @Post("/info")
  @UseInterceptors(FileInterceptor("profile", { storage }))
  initUserInfo(
    @Body() updateUserInfoDto: UpdateUserInfoDto,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    updateUserInfoDto.profileImg = file.filename;
    return this.userService.initUserInfo(req.user.id, updateUserInfoDto); //본인아이디, 바꿀 닉네임, 바꿀 프로필
    //리턴값 미정
  }
}
