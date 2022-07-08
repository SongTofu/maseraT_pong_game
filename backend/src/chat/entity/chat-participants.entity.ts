import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "src/user/user.entity";
import { ChatRoom } from "./chat-room.entity";
import { Authority } from "../enum/authority.enum";

@Entity()
export class ChatParticipants extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: Authority.participant })
  authority: Authority;

  @ManyToOne((type) => User, (user) => user.chatParticipants)
  user: User;

  @ManyToOne(
    (type) => ChatRoom,
    (chatRoom) => {
      chatRoom.chatParticipants;
    },
  )
  chatRoom: ChatRoom;
}
