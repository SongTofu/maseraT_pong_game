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
export class ChatParticipant extends BaseEntity {
  //채팅금지 추가하기
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: Authority.PARTICIPANT })
  authority: Authority;

  @ManyToOne((type) => User, (user) => user.chatParticipant)
  user: User;

  @ManyToOne(
    (type) => ChatRoom,
    (chatRoom) => {
      chatRoom.chatParticipant;
    },
  )
  chatRoom: ChatRoom;

  //이게 맞을까? 이게 되나?
  @Column("date", { default: () => "(CURRENT_DATE) - 30" })
  chatBlock: Date;
}
