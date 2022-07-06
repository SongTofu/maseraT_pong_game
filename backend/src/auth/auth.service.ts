import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/user/user.repository";
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
      const autoNickname = this.autoSetNickName(userDto);

      user = this.userRepository.create({
        apiId: userDto.apiId,
        email: userDto.email,
        nickname: autoNickname,
      });
      user = await user.save();
    }

    const id = user.id;
    const payload = { id };
    const accessToken = await this.jwtService.sign(payload);

    return {
      secondAuth: user.secondAuth,
      nickname: user.nickname,
      token: accessToken,
    };
  }
  private autoSetNickName(userDto: UserDto) {
    const authCode: string = Math.random().toString(36).substr(2, 5);
    const autoNickname: string = userDto.nickname + "_" + authCode;
    return autoNickname;
  }
}
