import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user-info/entity/user.entity";
import { UserRepository } from "src/user-info/repository/user.repository";

@Injectable()
export class AuthService {
  constructor(
    // private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async logIn(user: any) {
    const payload = {
      nickname: user.nickname,
      // email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
