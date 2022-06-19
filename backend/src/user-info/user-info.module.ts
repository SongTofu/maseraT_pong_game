import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repository/user.repository";
import { UserInfoController } from "./user-info.controller";
import { UserInfoService } from "./user-info.service";
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
  controllers: [UserInfoController],
  providers: [UserInfoService],
})
export class UserInfoModule {}
