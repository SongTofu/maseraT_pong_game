import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from "typeorm";
import { User } from "src/user/user.entity";
import { ChatRoom } from "./chat-room.entity";

@Entity()
export class DM extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    (type) => ChatRoom,
    (chatRoom) => {
      chatRoom.dm;
    },
  )
  chatRoom: ChatRoom;

  @ManyToOne((type) => User, (user) => user.dm)
  sender: User;

  @Column({ default: "" })
  message: string;
}
