import { EntityRepository, Repository } from "typeorm";
import { ChatRoom } from "../entity/chat-room.entity";
import { ChatJoinDto } from "../dto/chat-join.dto";
import * as bcrypt from "bcryptjs";
import { ChatLeaveDto } from "../dto/chat-leave.dto";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(ChatRoom)
export class ChatRoomRepository extends Repository<ChatRoom> {
  async createRoom(chatJoinDto: ChatJoinDto): Promise<number> {
    const { title, password } = chatJoinDto;

    const chatRoom: ChatRoom = this.create({
      title,
      isDM: false,
    });

    if (password !== "") {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      chatRoom.password = hashedPassword;
    }
    const saveRoom = await chatRoom.save();

    return saveRoom.id;
  }

  async deleteRoom(chatRoomId: number): Promise<void> {
    const result = await this.delete(chatRoomId);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Can't find Room with id ${chatRoomId}`, //있어야 할까,,?
      );
    }
  }
}
