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

  @Get("/dm/:chatRoomId")
  async dmLog(
    @Req() req,
    @Param("chatRoomId", ParseIntPipe) chatRoomId: number,
  ): Promise<DMDto> {
    return this.chatService.dmLog(req.user.id, chatRoomId);
  }
}
