import { EntityRepository, Repository } from "typeorm";
import { ChatRoom } from "../entity/chat-room.entity";
import { ChatJoinDto } from "../dto/chat-join.dto";

@EntityRepository(ChatRoom)
export class ChatRoomRepository extends Repository<ChatRoom> {
  async createRoom(chatJoinDto: ChatJoinDto): Promise<number> {
    if (chatJoinDto.isCreate) {
      const chatRoom: ChatRoom = this.create({
        title: chatJoinDto.title,
        password: chatJoinDto.password,
        isDM: false,
      });
      const saveRoom = await chatRoom.save();
      return saveRoom.id;
    }
    return chatJoinDto.chatRoomId;
  }
}
