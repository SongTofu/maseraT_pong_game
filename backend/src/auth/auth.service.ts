import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/user/user.repository";
import { UserDto } from "./dto/user.dto";
import { LogInDto } from "./dto/login.dto";
import { AchievementRepository } from "src/achievement/achievement.repository";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private achievementRepository: AchievementRepository,
  ) {}

  async logIn(userDto: UserDto): Promise<LogInDto> {
    let firstLogin: boolean = false;

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
      this.achievementRepository.createDefaultAchievement(user);
      firstLogin = true;
    }

    const id = user.id;
    const payload = { id };
    const accessToken = await this.jwtService.sign(payload);

    const logInDto: LogInDto = {
      firstLogin,
      secondAuth: user.secondAuth,
      nickname: user.nickname,
      token: accessToken,
      userId: user.id,
    };
    return logInDto;
  }

  private autoSetNickName(userDto: UserDto) {
    const authCode: string = Math.random().toString(36).substr(2, 5);
    const autoNickname: string = userDto.nickname + "_" + authCode;
    return autoNickname;
  }
}
