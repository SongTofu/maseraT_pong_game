import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { UserInfoController } from "./user-info.controller";
import { UserInfoService } from "./user-info.service";
import { FriendsRepository } from "./friends.repository";
import { BlockRepository } from "./block.repository";

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
