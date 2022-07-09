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
  async handleConnectUser(@ConnectedSocket() socket: Socket, @Req() req: any) {
    const user: User = await this.userRepository.findOne(req.user.id);

    const getAllUserDto: UserListDto = {
      userId: user.id,
      nickname: user.nickname,
      state: user.state,
    };
    this.server.emit("connect-user", getAllUserDto);
  }
}
