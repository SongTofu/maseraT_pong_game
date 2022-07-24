import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatParticipantRepository } from "./repository/chat-participant.repository";
import { ChatRoomRepository } from "./repository/chat-room.repository";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";
import { UserRepository } from "src/user/user.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatParticipantRepository,
      ChatRoomRepository,
      UserRepository,
    ]),
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
  exports: [ChatGateway],
})
export class ChatModule {}
