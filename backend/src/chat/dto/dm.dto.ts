import { ChatRoom } from "../entity/chat-room.entity";
import { DM } from "../entity/dm.entity";
import { DMMessageDto } from "../dto/dm-message.dto";

export class DMDto {
  constructor(chatRoom: ChatRoom, datas: DM[]) {
    this.chatRoomId = chatRoom.id;
    this.title = chatRoom.title;
    datas.forEach((data) => {
      this.message.push(new DMMessageDto(data.sender, data.message));
    });
  }
  chatRoomId: number;
  title: string;
  message: DMMessageDto[] = [];
}
