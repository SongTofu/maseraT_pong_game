import { EntityRepository, Repository } from "typeorm";
import { DM } from "../entity/dm.entity";
import { ChatMessageDto } from "../dto/chat-message.dto";
import { ChatRoom } from "../entity/chat-room.entity";
import { User } from "src/user/user.entity";

@EntityRepository(DM)
export class DMRepository extends Repository<DM> {
  async createDM(
    chatRoom: ChatRoom,
    sender: User,
    chatMessageDto: ChatMessageDto,
  ) {
    const dmMessage: DM = this.create({
      chatRoom,
      sender,
      message: chatMessageDto.message,
    });

    await dmMessage.save();
  }
}
