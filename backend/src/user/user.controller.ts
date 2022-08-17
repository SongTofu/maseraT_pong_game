import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  UseInterceptors,
  UseGuards,
  Req,
  UploadedFile,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { MyUserInfoDto } from "./dto/my-user-info.dto";
import { TargetUserInfoDto } from "./dto/target-user-info.dto";
import { UpdateUserInfoDto } from "./dto/update-user-info.dto";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserListDto } from "./dto/user-list.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";

const storage = diskStorage({
  destination: "./img",
  filename: (req, file, cb) => {
    const filename = Date.now() + file.originalname;
    cb(null, filename);
  },
});

@UseGuards(JwtAuthGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUser(): Promise<UserListDto[]> {
    return this.userService.getAllUser();
  }

  @Get("info")
  getMyInfo(@Req() req): Promise<MyUserInfoDto> {
    return this.userService.getMyInfo(req.user.id);
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
  ): Promise<{ isSuccess: boolean }> {
    if (file) updateUserInfoDto.profileImg = file.filename;
    return this.userService.updateUser(req.user.id, updateUserInfoDto);
  }
}
