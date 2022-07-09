import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { User } from "../user/user.entity";
import { UserRepository } from "../user/user.repository";
import { Req } from "@nestjs/common";
import { UserListDto } from "././dto/user-list.dto";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class UserGateway {
  constructor(private userRepository: UserRepository) {}

  @WebSocketServer()
  server;

  @SubscribeMessage("connect-user")
  async handleConnectUser(@ConnectedSocket() socket: Socket, @Req() req) {
    //req ㅅㅏ용 가능?
    const user: User = await this.userRepository.findOne(req.user.id);

    const userListDto: UserListDto = {
      userId: user.id,
      nickname: user.nickname,
      state: user.state,
      socketId: user.socketId,
    };
    this.server.emit("connect-user", userListDto);
  }
}
