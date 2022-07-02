import { Injectable } from "@nestjs/common";
import { ChatParticipantDto } from "./dto/chat-participant.dto";
import { ChatParticipantsRepository } from "./repository/chat-participants.repository";
import { ChatParticipants } from "./entity/chat-participants.entity";

@Injectable()
export class ChatService {
  constructor(private chatParticipantsRepository: ChatParticipantsRepository) {}

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
}
