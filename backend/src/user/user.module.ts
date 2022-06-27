import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repository/user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { FriendsRepository } from "./repository/friends.repository";
import { BlockRepository } from "./repository/block.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      FriendsRepository,
      BlockRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserInfoModule {}
