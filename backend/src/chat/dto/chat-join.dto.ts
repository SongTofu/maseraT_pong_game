import { Authority } from "../enum/authority.enum";

export class ChatJoinDto {
  chatRoomId: number;
  title: string;
  password: string;
  userId: number;
  nickname: string;
  authority: Authority;
}
