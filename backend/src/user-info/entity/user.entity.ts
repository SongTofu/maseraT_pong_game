import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  Unique,
} from "typeorm";
import { Record } from "src/record/record.entity";
import { SecondAuthCode } from "src/second-auth/second-auth-code.entity";
import { Friends } from "./friends.entity";
import { Block } from "./block.entity";
import { UserState } from "../user-state.enum";
import { ChatRoom } from "src/chat/entity/chat-room.entity";

@Entity()
@Unique(["nickname"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apiId: string;

  @Column({ unique: true })
  nickname: string;

  @Column()
  secondAuth: boolean;

  @Column()
  email: string;

  @Column()
  pWin: number;

  @Column()
  pLose: number;

  @Column()
  rWin: number;

  @Column()
  rLose: number;

  @Column()
  profileImg: string;

  @Column()
  state: UserState;

  @Column()
  level: number;

  @OneToMany(
    (type) => Record,
    (record) => {
      record.user, record.enemy;
    },
  )
  record: Record[];

  @OneToOne((type) => SecondAuthCode, (secondAuthCode) => secondAuthCode.user)
  secondAuthCode: SecondAuthCode;

  @OneToMany(
    (type) => Friends,
    (friends) => {
      friends.ownId, friends.friendsId;
    },
  )
  friends: Friends[];

  @OneToMany(
    (type) => Block,
    (block) => {
      block.ownId, block.blockId;
    },
  )
  block: Block;

  @OneToMany(
    (type) => ChatRoom,
    (chatRoom) => {
      chatRoom.user;
    },
  )
  chatRoom: ChatRoom;
}
