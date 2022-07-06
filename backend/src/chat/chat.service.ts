import { Injectable } from "@nestjs/common";
import { ChatParticipantDto } from "./dto/chat-participant.dto";
import { ChatParticipantsRepository } from "./repository/chat-participants.repository";
import { ChatParticipants } from "./entity/chat-participants.entity";
import { ChatRoom } from "./entity/chat-room.entity";
import { ChatRoomRepository } from "./repository/chat-room.repository";
import { ChatRoomDto } from "./dto/chat-room.dto";

@Injectable()
export class ChatService {
  constructor(
    private chatParticipantsRepository: ChatParticipantsRepository,
    private chatRoomRepository: ChatRoomRepository,
  ) {}

  async participantList(chatRoomId: number): Promise<ChatParticipantDto[]> {
    const chatParticipants: ChatParticipants[] =
      await this.chatParticipantsRepository.find({
        where: { chatRoom: chatRoomId },
        relations: ["user"],
      });

    const chatParticipantDto: ChatParticipantDto[] = [];

    chatParticipants.forEach((chatParticipant) => {
      chatParticipantDto.push(
        new ChatParticipantDto(chatParticipant, chatRoomId),
      );
    });
    return chatParticipantDto;
  }

  async chatRoomList(): Promise<ChatRoomDto[]> {
    const chatRooms: ChatRoom[] = await this.chatRoomRepository.find({
      relations: ["chatParticipants"],
    });
    const chatRoomDto: ChatRoomDto[] = [];

    chatRooms.forEach((chatRoom) => {
      chatRoomDto.push(
        new ChatRoomDto(chatRoom, chatRoom.chatParticipants.length),
      );
    });

    return chatRoomDto;
  }
}
