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
import { ChatParticipant } from "src/chat/entity/chat-participant.entity";
import { ChatParticipantRepository } from "src/chat/repository/chat-participant.repository";
import { ChatLeaveDto } from "src/chat/dto/chat-leave.dto";
import { ChatGateway } from "src/chat/chat.gateway";
import { GameParticipant } from "src/game/entity/game-participant.entity";
import { GameRoomRepository } from "src/game/repository/game-room.repository";
import { GameParticipantRepository } from "src/game/repository/game-participant.repository";
import { UserState } from "./user-state.enum";
import { Friend } from "src/friend/friend.entity";
import { FriendRepository } from "src/friend/friend.repository";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class UserGateway {
  constructor(
    private userRepository: UserRepository,
    private chatParticipantsRepository: ChatParticipantRepository,
    private chatGateway: ChatGateway,
    private gameParticipantsRepository: GameParticipantRepository,
    private gameRoomRepository: GameRoomRepository,
    private friendRepository: FriendRepository,
  ) {}

  @WebSocketServer()
  server;

  @SubscribeMessage("connect-user")
  async handleConnectUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { userId: number },
  ) {
    console.log(socket.id);
    const user: User = await this.userRepository.findOne(data.userId);
    user.socketId = socket.id;
    user.state = UserState.CONNECT;

    await user.save();

    // this.userAll(); 안쓸거임!
    // this.handleFriend(socket, { userId: data.userId });
    // this.chatGateway.handleChatRoomAll(socket);
  }

  @SubscribeMessage("friend-all")
  async handleFriend(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { userId: number },
  ) {
    this.friendAll(socket.id, data.userId);
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

    await user.save();

    // 채팅방 떠남
    const leaveChatRooms: ChatParticipant[] =
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

  async userAll() {
    const users: User[] = await this.userRepository.find();

    const userListDto: UserListDto[] = [];

    users.forEach((user) => {
      userListDto.push(new UserListDto(user));
    });

    console.log("user-all");
    this.server.emit("user-all", userListDto);
  }

  async friendAll(socketId: string, userId: number): Promise<void> {
    const friends: Friend[] = await this.friendRepository.find({
      where: {
        ownId: userId,
      },
      relations: ["friendId"],
    });
    const userListDto: UserListDto[] = [];

    friends.forEach((friend) => {
      userListDto.push(new UserListDto(friend.friendId));
    });

    const user: User = await this.userRepository.findOne(userId);
    this.server.in(socketId).emit("friend-all", userListDto);
    console.log("user list dto", userListDto);
  }
}
