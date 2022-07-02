import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Friend extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.friends)
  ownId: User;

  @ManyToOne((type) => User, (user) => user.friends)
  friendsId: User;
}
