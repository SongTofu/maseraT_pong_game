import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
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

  @OneToMany(
    (type) => ChatParticipants,
    (chatParticipants) => chatParticipants.chatRoom,
  )
  chatParticipants: ChatParticipants;
}
