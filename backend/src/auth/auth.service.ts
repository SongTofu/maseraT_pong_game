import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/user/repository/user.repository";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async logIn(userDto: UserDto): Promise<any> {
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

    const id = user.apiId;
    const payload = { id };
    const accessToken = await this.jwtService.sign(payload);

    return {
      secondAuth: user.secondAuth,
      nickname: user.nickname,
      token: accessToken,
    };
  }
}
