import { Controller, Get, Param, UseGuards, Req } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatRoomDto } from "./dto/chat-room.dto";
import { ChatRoomDetailDto } from "./dto/chat-room-detail.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { DMDto } from "./dto/dm.dto";

@Controller("chat")
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get("/room/:chatRoomId") //ㅊㅐ팅방 제목, 참여자 리스트 보내줄 수 있게
  async chatRoomDetail(
    @Param("chatRoomId") chatRoomId: number,
  ): Promise<ChatRoomDetailDto> {
    return this.chatService.chatRoomDetail(chatRoomId);
  }

  @Get("/room")
  async chatRoomList(): Promise<ChatRoomDto[]> {
    return this.chatService.chatRoomList();
  }

  @Get("/dm/:chatRoomId")
  async dmLog(
    @Req() req,
    @Param("chatRoomId") chatRoomId: number,
  ): Promise<DMDto> {
    return this.chatService.dmLog(req.user.id, chatRoomId);
  }
}
