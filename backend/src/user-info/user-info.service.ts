import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { TargetUserInfoDto } from "./dto/target-user-info.dto";

@Injectable()
export class UserInfoService {
  constructor(private userRepository: UserRepository) {}

  async targetInfo(
    userId: number,
    targetId: number,
  ): Promise<TargetUserInfoDto> {
    const user = await this.userRepository.findOne(userId);

    if (
      await this.userRepository.findOne({
        where: {
          ownId: userId,
          friendsId: targetId,
        },
      })
    ) {
      const isFriend: boolean = true;
    } else {
      const isFriend: boolean = true;
    }

    const targetUserInfoDto: TargetUserInfoDto = {
      nickname: user.nickname,
      pWin: user.pWin,
      pLose: user.pLose,
      rWin: user.rWin,
      rLose: user.rLose,
      profileImg: user.profileImg,
      state: user.state,
      level: user.level,
      isFriend: false,
      isBlocked: false,
    };
    console.log("target user", targetUserInfoDto);
    return;
  }
}
