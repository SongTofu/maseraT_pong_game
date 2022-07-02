import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { TargetUserInfoDto } from "./dto/target-user-info.dto";
import { User } from "./user.entity";
import { FriendsRepository } from "../friend/friends.repository";
import { BlockRepository } from "../block/block.repository";
import { MyUserInfoDto } from "./dto/my-user-info.dto";
import { UpdateUserInfoDto } from "./dto/update-user-info.dto";
import { GetAllUserDto } from "./dto/get-all-user.dto";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private friendsRepository: FriendsRepository,
    private blockRepository: BlockRepository,
  ) {}

  // test after saved in db
  async getAllUser(): Promise<GetAllUserDto[]> {
    const getAllUserDto: GetAllUserDto[] = [];
    const user: User[] = await this.userRepository.find();

    if (!user) {
      throw new NotFoundException(`Noboby user exist`);
    }

    for (let i = 0; i < user.length; i++) {
      getAllUserDto.push({
        userId: user[i].apiId,
        nickname: user[i].nickname,
        state: user[i].state,
      });
    }

    return getAllUserDto;
  }

  async getMyInfo(id: number): Promise<MyUserInfoDto> {
    const user: User = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    } //나중에 접속한 사람 확인되면 삭제가능
    const myUserInfoDto: MyUserInfoDto = {
      nickname: user.nickname,
      secondAuth: user.secondAuth,
      personalWin: user.personalWin,
      personalLose: user.personalLose,
      profileImg: user.profileImg,
      ladderWin: user.ladderWin,
      ladderLose: user.ladderLose,
      level: user.level,
    };
    return myUserInfoDto;
  }

  async targetInfo(
    userId: number,
    targetId: number,
  ): Promise<TargetUserInfoDto> {
    const user = await this.userRepository.findOne(userId);
    const target = await this.userRepository.findOne(targetId);

    const isFriend = await this.isFriend(user, target);
    const isBlocked = await this.isBlocked(user, target);
    const targetUserInfoDto: TargetUserInfoDto = {
      nickname: user.nickname,
      personalWin: user.personalWin,
      personalLose: user.personalLose,
      ladderWin: user.ladderWin,
      ladderLose: user.ladderLose,
      profileImg: user.profileImg,
      state: user.state,
      level: user.level,
      isFriend,
      isBlocked,
    };
    return targetUserInfoDto;
  }

  async updateUser(userId: number, updateUserInfoDto: UpdateUserInfoDto) {
    const user: User = await this.userRepository.findOne(userId);

    if (updateUserInfoDto.nickname) {
      user.nickname = updateUserInfoDto.nickname;
    }
    if (updateUserInfoDto.profileImg) {
      user.profileImg = updateUserInfoDto.profileImg;
    }
    if (updateUserInfoDto.secondAuth) {
      user.secondAuth = updateUserInfoDto.secondAuth;
    }
    try {
      await user.save();
    } catch (error) {
      if (error.code === "23505") return { success: false };
      else {
        throw new InternalServerErrorException();
      }
    }
    return { success: true };
  }

  private async isFriend(user: User, target: User): Promise<boolean> {
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

  private async isBlocked(user: User, target: User): Promise<boolean> {
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

  async initUserInfo(
    id: number,
    updateUserInfoDto: UpdateUserInfoDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    } //나중에 접속한 사람 확인되면 삭제가능

    if (updateUserInfoDto.nickname) {
      user.nickname = updateUserInfoDto.nickname;
    }
    if (updateUserInfoDto.profileImg) {
      user.profileImg = updateUserInfoDto.profileImg;
    }

    try {
      await user.save();
    } catch (error) {
      if (error.code === "23505")
        throw new ConflictException("Existing username");
      else {
        throw new InternalServerErrorException();
      }
    }
    return user; //return 값 미정
  }
}
