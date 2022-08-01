import { ChatRoom } from "../entity/chat-room.entity";
import { DM } from "../entity/dm.entity";
import { DMMessageDto } from "../dto/dm-message.dto";

export class DMDto {
  constructor(chatRoom: ChatRoom, dms: DM[]) {
    this.chatRoomId = chatRoom.id;
    this.title = chatRoom.title;
    dms.forEach((dm) => {
      this.message.push(new DMMessageDto(dm.sender.nickname, dm.message));
    });
  }
  chatRoomId: number;
  title: string;
  message: DMMessageDto[] = [];
}
