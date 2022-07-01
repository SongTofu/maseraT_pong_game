import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatParticipantsRepository } from "./repository/chat-participants.repository";
import { ChatRoomRepository } from "./repository/chat-room.repository";
import { UserRepository } from "src/user/repository/user.repository";
import { ChatController } from "./chat.controller";
import { ChatService } from "./chat.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatParticipantsRepository,
      ChatRoomRepository,
      UserRepository,
    ]),
  ],
  providers: [ChatGateway, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
