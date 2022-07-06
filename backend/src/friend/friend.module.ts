import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendController } from "./friend.controller";
import { FriendService } from "./friend.service";
import { FriendsRepository } from "./friend.repository";

@Module({
  imports: [TypeOrmModule.forFeature([FriendsRepository])],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
