import { Authority } from "../enum/authority.enum";
import { ChatParticipants } from "../entity/chat-participants.entity";

export class ChatParticipantDto {
  constructor(chatParticipant: ChatParticipants, roomId: number) {
    this.userId = chatParticipant.user.id;
    this.nickname = chatParticipant.user.nickname;
    this.authority = chatParticipant.authority;
    this.roomId = roomId;
  }
  userId: number;
  nickname: string;
  authority: Authority;
  roomId: number;
}
