import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "src/user-info/entity/user.entity";
import { ChatParticipants } from "./chat-participants.entity";

@Entity()
export class ChatRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  password: string;

  @Column()
  isDM: boolean;

  @ManyToOne((type) => User, (user) => user.chatRoom)
  user: User;

  @OneToMany(
    (type) => ChatParticipants,
    (chatParticipants) => chatParticipants.chatRoom,
  )
  chatParticipants: ChatParticipants;
}
