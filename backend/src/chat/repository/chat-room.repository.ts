import { EntityRepository, Repository } from "typeorm";
import { ChatRoom } from "../entity/chat-room.entity";
import { ChatJoinDto } from "../dto/chat-join.dto";
import { ChatLeaveDto } from "../dto/chat-leave.dto";

@EntityRepository(ChatRoom)
export class ChatRoomRepository extends Repository<ChatRoom> {
  async createRoom(chatJoinDto: ChatJoinDto): Promise<number> {
    console.log("true?", chatJoinDto.isCreate);
    if (!chatJoinDto.isCreate) {
      const chatRoom: ChatRoom = this.create({
        title: chatJoinDto.title,
        password: chatJoinDto.password,
        isDM: false,
      });
      chatJoinDto.isCreate = true;
      const saveRoom = await this.save(chatRoom);
      return saveRoom.id;
    }
    return chatJoinDto.chatRoomId;
  }

  async DeleteRoom(chatRoomId: number): Promise<void> {
    const result: ChatRoom = await this.findOne(chatRoomId);
    if (result) this.delete(chatRoomId);
  }
}
