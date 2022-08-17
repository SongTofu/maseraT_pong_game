import { Injectable, BadRequestException } from "@nestjs/common";
import { ChatParticipantDto } from "./dto/chat-participant.dto";
import { ChatParticipantRepository } from "./repository/chat-participant.repository";
import { ChatParticipant } from "./entity/chat-participant.entity";
import { ChatRoom } from "./entity/chat-room.entity";
import { ChatRoomRepository } from "./repository/chat-room.repository";
import { ChatRoomDto } from "./dto/chat-room.dto";
import { ChatRoomDetailDto } from "./dto/chat-room-detail.dto";
import { DMDto } from "./dto/dm.dto";
import { DM } from "./entity/dm.entity";
import { DMRepository } from "./repository/dm.repository";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.entity";

@Injectable()
export class ChatService {
  constructor(
    private userRepository: UserRepository,
    private chatParticipantRepository: ChatParticipantRepository,
    private chatRoomRepository: ChatRoomRepository,
    private dmRepository: DMRepository,
  ) {}

  async chatRoomDetail(
    userId: number,
    chatRoomId: number,
  ): Promise<ChatRoomDetailDto> {
    const chatRoom: ChatRoom = await this.chatRoomRepository.findOne(
      chatRoomId,
    );
    const user: ChatParticipant = await this.chatParticipantRepository.findOne({
      where: { chatRoom, user: userId },
      relations: ["user"],
    });

    if (!chatRoom || !user) {
      throw new BadRequestException();
    }

    const chatParticipants: ChatParticipant[] =
      await this.chatParticipantRepository.find({
        where: { chatRoom: chatRoomId },
        relations: ["user"],
        order: {
          authority: -1,
        },
      });

    const chatParticipantDto: ChatParticipantDto[] = [];

    chatParticipants.forEach((chatParticipant) => {
      chatParticipantDto.push(new ChatParticipantDto(chatParticipant));
    });
    const chatRoomDetailDto: ChatRoomDetailDto = {
      chatRoomId: chatRoomId,
      title: chatRoom.title,
      isPassword: chatRoom.password ? true : false,
      chatParticipant: chatParticipantDto,
    };

    return chatRoomDetailDto;
  }

  async chatRoomList(): Promise<ChatRoomDto[]> {
    const chatRooms: ChatRoom[] = await this.chatRoomRepository.find({
      where: { isDM: false },
      relations: ["chatParticipant"],
    });
    const chatRoomDto: ChatRoomDto[] = [];

    chatRooms.forEach((chatRoom) => {
      chatRoomDto.push(new ChatRoomDto(chatRoom));
    });

    return chatRoomDto;
  }

  async dmLog(userId: number, chatRoomId: number): Promise<DMDto> {
    const user: User = await this.userRepository.findOne(userId);
    let target: User;
    const chatRoom: ChatRoom = await this.chatRoomRepository.findOne(
      chatRoomId,
    );
    const chatParticipants: ChatParticipant[] =
      await this.chatParticipantRepository.find({
        where: { chatRoom },
        relations: ["user"],
      });
    chatParticipants.forEach((chatParticipant) => {
      if (chatParticipant.user.id !== user.id) target = chatParticipant.user;
    });
    const dm: DM[] = await this.dmRepository.find({
      where: { chatRoom },
      relations: ["sender"],
    });
    const dmDto: DMDto = new DMDto(chatRoom, dm, target.nickname);
    return dmDto;
  }
}
