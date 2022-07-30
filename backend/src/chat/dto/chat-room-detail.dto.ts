import { ChatParticipantDto } from "./chat-participant.dto";
import { ChatRoom } from "../entity/chat-room.entity";
import { ChatParticipant } from "../entity/chat-participant.entity";

export class ChatRoomDetailDto {
  constructor(chatRoom: ChatRoom, participants: ChatParticipant[]) {
    this.chatRoomId = chatRoom.id;
    this.title = chatRoom.title;
    participants.forEach((participant) => {
      this.chatParticipant.push(new ChatParticipantDto(participant));
    });
  }
  chatRoomId: number;
  title: string;
  isPassword: boolean;
  chatParticipant: ChatParticipantDto[] = [];
}
