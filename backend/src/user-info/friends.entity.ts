import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Friends extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.friends, { eager: false })
  ownId: User;

  @ManyToOne((type) => User, (user) => user.friends, { eager: false })
  friendsId: User;
}
