import { Controller, Get, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatParticipantDto } from "./dto/chat-participant.dto";
import { ChatRoomDto } from "./dto/chat-room.dto";

@Controller("chat")
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get("/participant/:chatRoomId")
  async participantList(
    @Param("chatRoomId") chatRoomId: number,
  ): Promise<ChatParticipantDto[]> {
    return this.chatService.chatParticipantList(chatRoomId);
  }

  @Get("/room")
  async chatRoomList(): Promise<ChatRoomDto[]> {
    return this.chatService.chatRoomList();
  }
}
