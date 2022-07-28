import { Injectable } from "@nestjs/common";
import { ChatParticipantDto } from "./dto/chat-participant.dto";
import { ChatParticipantRepository } from "./repository/chat-participant.repository";
import { ChatParticipant } from "./entity/chat-participant.entity";
import { ChatRoom } from "./entity/chat-room.entity";
import { ChatRoomRepository } from "./repository/chat-room.repository";
import { ChatRoomDto } from "./dto/chat-room.dto";
import { ChatRoomDetailDto } from "./dto/chat-room-detail.dto";

@Injectable()
export class ChatService {
  constructor(
    private chatParticipantRepository: ChatParticipantRepository,
    private chatRoomRepository: ChatRoomRepository,
  ) {}

  async chatRoomDetail(chatRoomId: number): Promise<ChatRoomDetailDto> {
    const chatParticipants: ChatParticipant[] =
      await this.chatParticipantRepository.find({
        where: { chatRoom: chatRoomId },
        relations: ["user"],
        order: {
          authority: -1,
        },
      });
    const chatRoom: ChatRoom = await this.chatRoomRepository.findOne(
      chatRoomId,
    );

    const chatParticipantDto: ChatParticipantDto[] = [];

    chatParticipants.forEach((chatParticipant) => {
      chatParticipantDto.push(new ChatParticipantDto(chatParticipant));
    });
    const chatRoomDetailDto: ChatRoomDetailDto = {
      chatRoomId: chatRoomId,
      title: chatRoom.title,
      chatParticipant: chatParticipantDto,
    };

    return chatRoomDetailDto;
  }

  async chatRoomList(): Promise<ChatRoomDto[]> {
    const chatRooms: ChatRoom[] = await this.chatRoomRepository.find({
      relations: ["chatParticipant"],
    });
    const chatRoomDto: ChatRoomDto[] = [];

    chatRooms.forEach((chatRoom) => {
      chatRoomDto.push(new ChatRoomDto(chatRoom));
    });

    return chatRoomDto;
  }
}
