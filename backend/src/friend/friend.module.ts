import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendController } from "./friend.controller";
import { FriendService } from "./friend.service";
import { FriendRepository } from "./friend.repository";
import { UserRepository } from "src/user/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([FriendRepository, UserRepository])],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
