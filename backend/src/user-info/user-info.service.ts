import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { MyUserInfoDto } from "./dto/my-user-info.dto";

@Injectable()
export class UserInfoService {
  constructor(private userRepository: UserRepository) {}
  async getMyInfo(id: number): Promise<MyUserInfoDto> {
    const user = await this.userRepository.findOne(id);

    const myUserInfoDto: MyUserInfoDto = {
      nickname: user.nickname,
      secondAuth: user.secondAuth,
      pWin: user.pWin,
      pLose: user.pLose,
      profileImg: user.profileImg,
      rWin: user.rWin,
      rLose: user.rLose,
      level: user.level,
    };
    console.log("info", myUserInfoDto);
    return myUserInfoDto;
  }
}
