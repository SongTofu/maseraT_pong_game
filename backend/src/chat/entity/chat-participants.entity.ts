import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "src/user-info/entity/user.entity";
import { ChatRoom } from "./chat-room.entity";

@Entity()
export class ChatParticipants extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authority: number;

  @ManyToOne((type) => User, (user) => user.chatRoom)
  user: User;

  @ManyToOne(
    (type) => ChatRoom,
    (chatRoom) => {
      chatRoom.chatParticipants;
    },
  )
  chatRoom: ChatRoom;
}
