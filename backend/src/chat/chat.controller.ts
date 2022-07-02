import { Controller, Get, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatParticipantDto } from "./dto/chat-participant.dto";

@Controller("chat")
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get("/participant/:chatRoomId")
  async participantList(
    @Param("chatRoomId") chatRoomId: number,
  ): Promise<ChatParticipantDto[]> {
    return this.chatService.participantList(chatRoomId);
  }
}
