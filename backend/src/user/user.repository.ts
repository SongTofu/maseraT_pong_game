import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { Record } from "src/record/record.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(nickname: string) {
    // const user = this.create({ nickname });
    const user = this.create({
      id: 12,
      nickname: nickname,
      secondAuth: false,
      email: "hello",
      pWin: 1,
      pLose: 1,
      rWin: 1,
      rLose: 1,
      profileImg: "a",
      state: 1,
      level: 1,
      //   record: Record,
    });
    console.log("user", user);
    this.save(user);
    // const user = this.create({ nickname });
    // try {
    //   await this.save(user);
    //   console.log("userr", user);
    // } catch (error) {
    //   if (error.code === "23505") {
    //     throw new ConflictException("Existing username");
    //   } else {
    //     throw new InternalServerErrorException();
    //   }
    // }
  }
}
