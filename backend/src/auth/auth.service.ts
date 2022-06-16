import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/userinfo/user.entity";
import { UserRepository } from "src/userinfo/user.repository";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async logIn(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
