import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repository/user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { BlockRepository } from "./repository/block.repository";
import { FriendsRepository } from "src/friend/friends.repository";

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
