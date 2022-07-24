import { ChatRoom } from "../entity/chat-room.entity";

export class ChatRoomDto {
  constructor(chatRoom: ChatRoom) {
    this.chatRoomId = chatRoom.id;
    this.title = chatRoom.title;
    if (chatRoom.password) {
      this.isPassword = true;
    } else {
      this.isPassword = false;
    }
  }
  chatRoomId: number;
  title: string;
  isPassword: boolean;
}
