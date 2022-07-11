import { ChatRoom } from "../entity/chat-room.entity";

export class ChatRoomDto {
  constructor(chatRoom: ChatRoom, numParticipant: number) {
    this.chatRoomId = chatRoom.id;
    this.title = chatRoom.title;
    this.password = chatRoom.password;
    this.numParticipant = numParticipant;
  }
  chatRoomId: number;
  title: string;
  password: string;
  numParticipant: number;
}
