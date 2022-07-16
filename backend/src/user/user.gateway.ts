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
import { ChatParticipants } from "src/chat/entity/chat-participants.entity";
import { ChatRoomRepository } from "src/chat/repository/chat-room.repository";
import { ChatParticipantsRepository } from "src/chat/repository/chat-participants.repository";
import { ChatLeaveDto } from "src/chat/dto/chat-leave.dto";
import { ChatGateway } from "src/chat/chat.gateway";
import { GameParticipant } from "src/game/entity/game-participant.entity";
import { GameRoomRepository } from "src/game/repository/game-room.repository";
import { GameParticipantRepository } from "src/game/repository/game-participant.repository";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class UserGateway {
  constructor(
    private userRepository: UserRepository,
    private chatParticipantsRepository: ChatParticipantsRepository,
    private chatRoomRepository: ChatRoomRepository,
    private chatGateway: ChatGateway,
    private gameParticipantsRepository: GameParticipantRepository,
    private gameRoomRepository: GameRoomRepository,
  ) {}

  @WebSocketServer()
  server;

  @SubscribeMessage("connect-user")
  async handleConnectUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() userId: number,
  ) {
    let user: User = await this.userRepository.findOne(userId);
    user.socketId = socket.id;

    const userListDto: UserListDto = {
      userId: user.id,
      nickname: user.nickname,
      state: user.state,
      socketId: user.socketId,
    };

    this.server.emit("connect-user", userListDto);
  }
  @SubscribeMessage("disconnect-user")
  async handleDisconnectUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() userId: number,
  ) {
    let user: User = await this.userRepository.findOne(userId);

    //user table에서 비활성화 시키기(이따구로 야매로 해도 괜찮은걸까?)
    user.state = 0;

    // 채팅방 떠남
    const leaveChatRooms: ChatParticipants[] =
      await this.chatParticipantsRepository.find(user);

    leaveChatRooms.forEach((leaveChatRoom) => {
      let chatLeaveDto: ChatLeaveDto = {
        chatRoomId: leaveChatRoom.id,
        userId: user.id,
        nickname: user.nickname,
      };
      this.chatGateway.handleChatRoomLeave(socket, chatLeaveDto);
    });

    //게임방 떠남
    const leaveGameRooms: GameParticipant[] =
      await this.gameParticipantsRepository.find(user);

    // leaveGameRooms.forEach((leaveGameRoom) => {
    // handleGameRoomLeave 생기면 넣으면 될 것 같음,,!
    // })
    this.server.emit("disconnect-user", { success: true }); //뭐 보내줄 거 있나,,,?
  }
}
