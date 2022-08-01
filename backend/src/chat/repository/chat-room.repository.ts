import { EntityRepository, Repository } from "typeorm";
import { ChatRoom } from "../entity/chat-room.entity";
import { ChatJoinDto } from "../dto/chat-join.dto";
import * as bcrypt from "bcryptjs";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(ChatRoom)
export class ChatRoomRepository extends Repository<ChatRoom> {
  async createRoom(chatJoinDto: ChatJoinDto, isDM: boolean): Promise<number> {
    const { title, password } = chatJoinDto;

    const chatRoom: ChatRoom = this.create({
      title,
      isDM,
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
    const result = await this.delete(chatRoomId); //수정!
  }
}
