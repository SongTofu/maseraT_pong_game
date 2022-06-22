import { EntityRepository, Repository } from "typeorm";
import { ChatRoom } from "../entity/chat-room.entity";
import { ChatJoinDto } from "../dto/chat-join.dto";
import { ChatLeaveDto } from "../dto/chat-leave.dto";
import { NotFoundException } from "@nestjs/common";

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

  async deleteRoom(chatLeaveDto: ChatLeaveDto): Promise<void> {
    const result = await this.delete(chatLeaveDto.chatRoomId);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Can't find Room with id ${chatLeaveDto.chatRoomId}`, //있어야 할까,,?
      );
    }
  }
}
