import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { ChatParticipantRepository } from "./repository/chat-participant.repository";
import { ChatRoomRepository } from "./repository/chat-room.repository";
import { ChatJoinDto } from "./dto/chat-join.dto";
import { ChatRoom } from "./entity/chat-room.entity";
import { ChatParticipant } from "./entity/chat-participant.entity";
import { User } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";
import { Authority } from "./enum/authority.enum";
import { ChatParticipantDto } from "./dto/chat-participant.dto";
import { SetAdminDto } from "./dto/set-admin.dto";
import * as bcrypt from "bcryptjs";
import { ChatLeaveDto } from "./dto/chat-leave.dto";
import { ChatMessageDto } from "./dto/chat-message.dto";
import { ChatKickDto } from "./dto/chat-kick.dto";
import { ChatRoomDto } from "./dto/chat-room.dto";
import { ChatSettingDto } from "./dto/chat-setting.dto";
import { ChatAuthorityDto } from "./dto/chat-authority.dto";
import { Block } from "src/block/block.entity";
import { BlockRepository } from "src/block/block.repository";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
})
export class ChatGateway {
  constructor(
    private chatRoomRepository: ChatRoomRepository,
    private chatParticipantsRepository: ChatParticipantRepository,
    private userRepository: UserRepository,
    private blockRepository: BlockRepository,
  ) {}

  @WebSocketServer()
  server;

  //////////////////////
  @SubscribeMessage("chat-room-all")
  async handleChatRoomAll(@ConnectedSocket() socket: Socket): Promise<void> {
    console.log("chat room all");
    const chatRooms: ChatRoom[] = await this.chatRoomRepository.find({
      order: { id: 1 },
    });

    const chatRoomDto: ChatRoomDto[] = [];

    chatRooms.forEach((chatRoom) => {
      chatRoomDto.push(new ChatRoomDto(chatRoom));
    });
    this.server.emit("chat-room-all", chatRoomDto);
  }

  @SubscribeMessage("chat-room-join")
  async handleJoinChatRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() chatJoinDto: ChatJoinDto,
  ): Promise<void> {
    console.log("chat-room-join");
    const user: User = await this.userRepository.findOne(chatJoinDto.userId);
    chatJoinDto.nickname = user.nickname;
    let isCreate: Boolean = false;

    // 방이 생성이면 생성 된 room id, 입장이면 프론트에서 넘어온 room id
    if (!chatJoinDto.chatRoomId) {
      chatJoinDto.chatRoomId = await this.chatRoomRepository.createRoom(
        chatJoinDto,
      );
      isCreate = true;
    }

    // 비번 틀리면 return
    if (!(await this.joinChatRoom(chatJoinDto, user, isCreate))) {
      return;
    }

    const chatRoomDto: ChatRoomDto = {
      chatRoomId: chatJoinDto.chatRoomId,
      title: chatJoinDto.title,
      isPassword: chatJoinDto.password ? true : false,
    };

    if (isCreate) {
      this.server.emit("chat-room-create", chatRoomDto);
    }

    socket.join("chat-" + chatJoinDto.chatRoomId);
    this.server
      .in("chat-" + chatJoinDto.chatRoomId)
      .emit("chat-room-join", chatJoinDto);
  }

  // setting
  @SubscribeMessage("chat-room-setting")
  async handleRoomSetting(
    @ConnectedSocket() socket: Socket,
    @MessageBody() chatSettingDto: ChatSettingDto,
  ) {
    console.log("chat-room-setting");
    const chatRoom: ChatRoom = await this.chatRoomRepository.findOne(
      chatSettingDto.chatRoomId,
    );

    if (chatSettingDto.title) {
      chatRoom.title = chatSettingDto.title;
    }

    if (chatSettingDto.password) {
      const salt = await bcrypt.genSalt();
      chatRoom.password = await bcrypt.hash(chatSettingDto.password, salt);
    }

    await chatRoom.save();

    await this.handleChatRoomAll(socket);
    this.server
      .in("chat-" + chatSettingDto.chatRoomId)
      .emit("chat-room-setting", {
        chatRoomId: chatSettingDto.chatRoomId,
        title: chatSettingDto.title,
      });
  }

  @SubscribeMessage("chat-room-message")
  async handleChatRoomMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() chatMessageDto: ChatMessageDto,
  ): Promise<void> {
    const user: User = await this.userRepository.findOne(chatMessageDto.userId);
    const blocks: Block[] = await this.blockRepository.find({
      where: { blockId: user.id },
      relations: ["ownId"],
    });
    let temp = this.server.in("chat-" + chatMessageDto.chatRoomId);
    blocks.forEach((block) => {
      temp = temp.except(block.ownId.socketId);
    });
    chatMessageDto.nickname = user.nickname;
    temp.emit("chat-room-message", chatMessageDto);
  }

  @SubscribeMessage("chat-room-set-admin")
  async handleChatRoomSetAdmin(
    @ConnectedSocket() socket: Socket,
    @MessageBody() setAdminDto: SetAdminDto,
  ): Promise<void> {
    console.log("chat-room-set-admin");
    const chatParticipant: ChatParticipant =
      await this.chatParticipantsRepository.findOne({
        where: {
          user: setAdminDto.userId,
          chatRoom: setAdminDto.chatRoomId,
        },
        relations: ["user"],
      });

    if (setAdminDto.isAdmin) {
      chatParticipant.authority = Authority.ADMIN;
    } else {
      chatParticipant.authority = Authority.PARTICIPANT;
    }

    await chatParticipant.save();
    // this.chatParticipantAll(setAdminDto.chatRoomId);
    const chatAuthorityDto: ChatAuthorityDto = {
      userId: chatParticipant.user.id,
      authority: chatParticipant.authority,
    };
    this.server
      .in("chat-" + setAdminDto.chatRoomId)
      .emit("chat-room-set-admin", chatAuthorityDto);
  }

  @SubscribeMessage("chat-room-kick")
  async handleChatRoomKick(
    @ConnectedSocket() socket: Socket,
    @MessageBody() chatKickDto: ChatKickDto,
  ) {
    const { chatRoomId, targetId } = chatKickDto;
    const target: User = await this.userRepository.findOne(targetId);

    const delUser: ChatParticipant =
      await this.chatParticipantsRepository.findOne({
        where: { chatRoom: chatRoomId, user: targetId },
      });
    await this.chatParticipantsRepository.delete(delUser);

    this.server.in(target.socketId).socketsLeave("chat-" + chatRoomId);
    this.server.in(target.socketId).emit("chat-room-kick", { chatRoomId });
    this.chatParticipantAll(chatRoomId);
  }

  ///////////////////////////

  @SubscribeMessage("chat-room-leave")
  async handleChatRoomLeave(
    @ConnectedSocket() socket: Socket,
    @MessageBody() chatLeaveDto: ChatLeaveDto,
  ): Promise<void> {
    const user: User = await this.userRepository.findOne(chatLeaveDto.userId);
    chatLeaveDto.nickname = user.nickname;

    const chatTitle = "chat-" + chatLeaveDto.chatRoomId;

    // socket.leave("chat-" + chatLeaveDto.chatRoomId); //방을 떠난다.

    // 참여자 리스트에서 그 룸의 그 참여자 삭제!
    const delUser: ChatParticipant =
      await this.chatParticipantsRepository.findOne({
        where: {
          chatRoom: chatLeaveDto.chatRoomId,
          user: user.id,
        },
      });
    // const userAuthority = delUser.authority;
    await this.chatParticipantsRepository.delete(delUser);

    // this.chatParticipantAll(chatLeaveDto.chatRoomId);
    this.server.in(chatTitle).emit("chat-room-leave", chatLeaveDto);
    socket.leave(chatTitle); //방을 떠난다.

    const participant: ChatParticipant =
      await this.chatParticipantsRepository.findOne({
        where: { chatRoom: chatLeaveDto.chatRoomId },
      });
    // if (!participant || userAuthority == Authority.owner) {
    if (!participant) {
      this.server.emit("chat-room-destroy", {
        chatRoomId: chatLeaveDto.chatRoomId,
      });
      await this.chatParticipantsRepository.deleteAllParticipants(
        chatLeaveDto.chatRoomId,
      );
      await this.chatRoomRepository.deleteRoom(chatLeaveDto.chatRoomId);
      // this.handleDisconnectChatRoom(chatLeaveDto.chatRoomId);
    }
  }

  // @SubscribeMessage("connect-chat-room")
  // handleConnectChatRoom(@MessageBody() chatJoinDto: ChatJoinDto) {
  //   const chatTitle = "chat-" + chatJoinDto.chatRoomId;
  //   const numParticipant: number =
  //     this.server.sockets.adapter.rooms.get(chatTitle).size;
  //   if (!numParticipant)
  //     throw new NotFoundException(
  //       `Can't find ChatRoom with ${chatJoinDto.title}`,
  //     );
  //   const chatRoomDto: ChatRoomDto = {
  //     chatRoomId: chatJoinDto.chatRoomId,
  //     title: chatJoinDto.title,
  //     // password: chatJoinDto.password,
  //     password: true,
  //     // numParticipant,
  //   };
  //   this.server.emit("connect-chat-room", chatRoomDto);
  // }

  // @SubscribeMessage("disconnect-chat-room")
  // handleDisconnectChatRoom(@MessageBody() chatRoomId: number) {
  //   this.server.emit("disconnect-chat-room", chatRoomId); //? ㅇㅣ렇게 줘도 괜찮나?
  // }

  private async joinChatRoom(
    chatJoinDto: ChatJoinDto,
    user: User,
    isCreate: Boolean,
  ): Promise<boolean> {
    const chatRoom: ChatRoom = await this.chatRoomRepository.findOne(
      chatJoinDto.chatRoomId,
    );

    const joinUser: ChatParticipant =
      await this.chatParticipantsRepository.findOne({
        where: {
          chatRoom: chatJoinDto.chatRoomId,
          user: chatJoinDto.userId,
        },
      });

    if (joinUser) return true;

    const chatParticipants: ChatParticipant =
      this.chatParticipantsRepository.create({
        user,
        chatRoom,
      });

    if (isCreate) chatParticipants.authority = Authority.OWNER;

    if (chatJoinDto.password) {
      if (await bcrypt.compare(chatJoinDto.password, chatRoom.password)) {
        return true;
      } else {
        return false;
      }
    }

    await chatParticipants.save();
    chatJoinDto.authority = chatParticipants.authority;

    // this.handleConnectChatRoom(chatJoinDto);
    return true;
  }

  async chatParticipantAll(roomId: number) {
    const participants: ChatParticipant[] =
      await this.chatParticipantsRepository.find({
        where: {
          chatRoom: roomId,
        },
        order: {
          authority: -1,
        },
        relations: ["user"],
      });

    const chatParticipantDto: ChatParticipantDto[] = [];

    participants.forEach((participant) => {
      chatParticipantDto.push(new ChatParticipantDto(participant));
    });
    // this.server.in("chat-" + roomId, chatParticipantDto);
    this.server
      .in("chat-" + roomId)
      .emit("chat-particip-all", chatParticipantDto);
  }
}
