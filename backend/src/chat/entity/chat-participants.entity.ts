import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "src/user-info/entity/user.entity";
import { ChatRoom } from "./chat-room.entity";
import { Authority } from "../enum/authority.enum";

@Entity()
export class ChatParticipants extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: Authority.partiicipnat })
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
