import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { TargetUserInfoDto } from "./dto/target-user-info.dto";
import { User } from "./user.entity";
import { FriendsRepository } from "./friends.repository";
import { Friends } from "./friends.entity";
import { BlockRepository } from "./block.repository";
import { MyUserInfoDto } from "./dto/my-user-info.dto";

@Injectable()
export class UserInfoService {
  constructor(
    private userRepository: UserRepository,
    private friendsRepository: FriendsRepository,
    private blockRepository: BlockRepository,
  ) {}

  async getMyInfo(id: number): Promise<MyUserInfoDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
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

  async targetInfo(
    userId: number,
    targetId: number,
  ): Promise<TargetUserInfoDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const target = await this.userRepository.findOne(targetId);

    const isFriend = await this.isFriend(user, target);
    const isBlocked = await this.isBlocked(user, target);
    const targetUserInfoDto: TargetUserInfoDto = {
      nickname: user.nickname,
      pWin: user.pWin,
      pLose: user.pLose,
      rWin: user.rWin,
      rLose: user.rLose,
      profileImg: user.profileImg,
      state: user.state,
      level: user.level,
      isFriend,
      isBlocked,
    };
    return targetUserInfoDto;
  }

  async isFriend(user: User, target: User): Promise<boolean> {
    if (
      await this.friendsRepository.findOne({
        where: {
          ownId: user,
          friendsId: target,
        },
      })
    ) {
      return true;
    } else {
      return false;
    }
  }

  async isBlocked(user: User, target: User): Promise<boolean> {
    if (
      await this.blockRepository.findOne({
        where: {
          ownId: user,
          blockId: target,
        },
      })
    ) {
      return true;
    } else {
      return false;
    }
  }
}
