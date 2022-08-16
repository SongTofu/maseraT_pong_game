import { ChatRoom } from "../entity/chat-room.entity";
import { DM } from "../entity/dm.entity";
import { DMMessageDto } from "../dto/dm-message.dto";

export class DMDto {
  constructor(chatRoom: ChatRoom, dms: DM[], targetNickname: string) {
    this.chatRoomId = chatRoom.id;
    this.title = chatRoom.title;
    this.targetNickname = targetNickname;
    dms.forEach((dm) => {
      this.message.push(new DMMessageDto(dm.sender.nickname, dm.message));
    });
  }
  chatRoomId: number;
  title: string;
  targetNickname: string;
  message: DMMessageDto[] = [];
}
