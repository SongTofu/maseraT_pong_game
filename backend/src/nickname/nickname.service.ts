import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.entity";
import { NicknameCredentialsDto } from "./dto/nickname-credential.dto";

@Injectable()
export class NicknameService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async isValidNickname(
    nicknameCredentialsDto: NicknameCredentialsDto,
  ): Promise<{ isValidNickname: boolean }> {
    const { nickname } = nicknameCredentialsDto;
    const found: User = await this.userRepository.findOne({ nickname });
    if (!found) return { isValidNickname: true };
    return { isValidNickname: false };
  }
}
