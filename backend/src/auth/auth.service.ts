import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/user-info/repository/user.repository";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async logIn(userDto: UserDto) {
    let user = await this.userRepository.findOne({
      where: {
        apiId: userDto.apiId,
      },
    });

    if (!user) {
      user = this.userRepository.create({
        apiId: userDto.apiId,
        email: userDto.email,
        nickname: "",
      });
      user.save();
    }

    return {
      secondAuth: user.secondAuth,
      nickname: user.nickname,
      token: "",
    };
  }
}
