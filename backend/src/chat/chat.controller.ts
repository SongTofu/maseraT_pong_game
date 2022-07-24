import { Controller, Get, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatParticipantDto } from "./dto/chat-participant.dto";
import { ChatRoomDto } from "./dto/chat-room.dto";
import { ChatRoomDetailDto } from "./dto/chat-room-detail.dto";

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

  @Get("/room/:id")
  async chatRoomDetail(@Param("id") id: number): Promise<ChatRoomDetailDto> {
    return await this.chatService.chatRoomDetail(id);
  }
}
