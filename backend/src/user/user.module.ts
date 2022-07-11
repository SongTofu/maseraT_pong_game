import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { BlockRepository } from "../block/block.repository";
import { FriendsRepository } from "src/friend/friend.repository";
import { UserGateway } from "./user.gateway";
import { ChatParticipantsRepository } from "src/chat/repository/chat-participants.repository";
import { GameParticipantRepository } from "src/game/repository/game-participant.repository";
import { ChatGateway } from "src/chat/chat.gateway";
import { ChatRoomRepository } from "src/chat/repository/chat-room.repository";
import { GameGateway } from "src/game/game.gateway";
import { GameRoomRepository } from "src/game/repository/game-room.repository";
import { RecordRepository } from "src/record/record.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      BlockRepository,
      FriendsRepository,
      ChatParticipantsRepository,
      ChatRoomRepository,
      GameParticipantRepository,
      GameRoomRepository,
      RecordRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserGateway, ChatGateway, GameGateway],
})
export class UserModule {}
