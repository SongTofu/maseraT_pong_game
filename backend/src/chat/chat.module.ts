import { Module } from "@nestjs/common";
import { ChatGateway } from "./chat.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatParticipantsRepository } from "./repository/chat-participants.repository";
import { ChatRoomRepository } from "./repository/chat-room.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatParticipantsRepository, ChatRoomRepository]),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
