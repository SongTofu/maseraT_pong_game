import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.entity";

@Injectable()
export class NicknameService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async isExistNickname(
    nickname: string,
  ): Promise<{ isExistNickname: boolean }> {
    const found: User = await this.userRepository.findOne({ nickname });
    if (!found) return { isExistNickname: true };
    return { isExistNickname: false };
  }
}
