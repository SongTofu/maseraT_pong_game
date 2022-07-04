import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { BlockRepository } from "../block/block.repository";
import { FriendsRepository } from "src/friend/friend.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      BlockRepository,
      FriendsRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserInfoModule {}
