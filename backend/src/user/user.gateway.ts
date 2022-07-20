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
import { UserListDto } from "././dto/user-list.dto";
import { ChatParticipants } from "src/chat/entity/chat-participants.entity";
import { ChatParticipantsRepository } from "src/chat/repository/chat-participants.repository";
import { ChatLeaveDto } from "src/chat/dto/chat-leave.dto";
import { ChatGateway } from "src/chat/chat.gateway";
import { GameParticipant } from "src/game/entity/game-participant.entity";
import { GameParticipantRepository } from "src/game/repository/game-participant.repository";
import { UserState } from "./user-state.enum";
import { GameLeaveDto } from "../game/dto/game-room.dto";
import { GameGateway } from "src/game/game.gateway";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class UserGateway {
  constructor(
    private userRepository: UserRepository,
    private chatParticipantsRepository: ChatParticipantsRepository,
    private chatGateway: ChatGateway,
    private gameParticipantsRepository: GameParticipantRepository,
    private gameGateway: GameGateway,
  ) {}

  @WebSocketServer()
  server;

  @SubscribeMessage("connect-user")
  async handleConnectUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { userId: number },
  ) {
    const user: User = await this.userRepository.findOne(data.userId);
    user.socketId = socket.id;

    const userListDto: UserListDto = {
      userId: user.id,
      nickname: user.nickname,
      state: UserState.CONNECT,
      socketId: user.socketId,
    };

    await user.save();

    this.server.emit("connect-user", userListDto);
  }

  @SubscribeMessage("disconnect")
  async handleDisconnectUser(@ConnectedSocket() socket: Socket) {
    const user: User = await this.userRepository.findOne({
      where: {
        socketId: socket.id,
      },
    });

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

    leaveGameRooms.forEach((leaveGameRoom) => {
      let gameLeaveDto: GameLeaveDto = {
        userId: user.id,
        title: "", //나중에 타이틀 뺄수도?
        gameRoomId: leaveGameRoom.id,
      };
      this.gameGateway.handleGameRoomLeave(socket, gameLeaveDto);
    });
    this.server.emit("disconnect-user", { success: true }); //뭐 보내줄 거 있나,,,?
  }
}
