import { Authority } from "../enum/authority.enum";
import { ChatParticipant } from "../entity/chat-participant.entity";

export class ChatParticipantDto {
  constructor(chatParticipant: ChatParticipant) {
    this.userId = chatParticipant.user.id;
    this.nickname = chatParticipant.user.nickname;
    this.authority = chatParticipant.authority;
  }
  userId: number;
  nickname: string;
  authority: Authority;
}
