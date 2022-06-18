import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ChatRoomRepository } from "./repository/chat-room.repository";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGateway {
  constructor(private chatRoomRepository: ChatRoomRepository) {}

  @WebSocketServer()
  server;

  @SubscribeMessage("join")
  joinHandle(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: { chatRoomId: string; message: string },
  ): void {
    socket.join(body.chatRoomId);
    this.server
      .in(body.chatRoomId)
      .emit("message", "join " + body.chatRoomId + " message " + body.message);
  }
}
