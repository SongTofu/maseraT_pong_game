import { Authority } from "../enum/authority.enum";
import { ChatParticipants } from "../entity/chat-participants.entity";

export class ChatParticipantDto {
  constructor(chatParticipant: ChatParticipants, roomId: number) {
    this.nickname = chatParticipant.user.nickname;
    this.authority = chatParticipant.authority;
    this.userId = chatParticipant.user.id;
    this.roomId = roomId;
  }
  roomId: number;
  nickname: string;
  authority: Authority;
  userId: number;
}
