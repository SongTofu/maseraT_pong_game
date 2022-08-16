import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  ParseIntPipe,
} from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatRoomDto } from "./dto/chat-room.dto";
import { ChatRoomDetailDto } from "./dto/chat-room-detail.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { DMDto } from "./dto/dm.dto";

@Controller("chat")
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private chatService: ChatService) {}

  //chatRoomId, gameRoomId -> 숫자 아닐때! || 채팅방 못 찾았을 때 처리하기 400 보내주기
  @Get("/room/:chatRoomId")
  async chatRoomDetail(
    @Req() req,
    @Param("chatRoomId", ParseIntPipe) chatRoomId: number,
  ): Promise<ChatRoomDetailDto> {
    return this.chatService.chatRoomDetail(req.user.id, chatRoomId);
  }

  @Get("/room")
  async chatRoomList(): Promise<ChatRoomDto[]> {
    return this.chatService.chatRoomList();
  }

  // @UseGuards(JwtAuthGuard)
  @Get("/dm/:chatRoomId")
  async dmLog(
    @Req() req,
    @Param("chatRoomId") chatRoomId: number,
  ): Promise<DMDto> {
    return this.chatService.dmLog(req.user.id, chatRoomId);
  }
}
