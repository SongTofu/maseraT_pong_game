import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(nickname: string) {
    return this.userRepository.createUser(nickname);
  }
  // findOne(nickname: string): Promise<User> {
  //   return this.userRepository.findOne(nickname);
  // }
}
