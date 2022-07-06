import { ChatRoom } from "../entity/chat-room.entity";

export class ChatRoomDto {
  constructor(chatRoom: ChatRoom, numParticipant: number) {
    this.title = chatRoom.title;
    this.password = chatRoom.password;
    this.numParticipant = numParticipant;
  }
  title: string;
  password: string;
  numParticipant: number;
}
