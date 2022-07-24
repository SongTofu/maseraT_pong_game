import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendController } from "./friend.controller";
import { FriendService } from "./friend.service";
import { FriendRepository } from "./friend.repository";
import { UserRepository } from "src/user/user.repository";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendRepository, UserRepository]),
    UserModule,
  ],
  controllers: [FriendController],
  providers: [FriendService],
  exports: [FriendModule],
})
export class FriendModule {}
