import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "../user/entity/user.entity";

@Entity()
export class Friends extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.friends)
  ownId: User;

  @ManyToOne((type) => User, (user) => user.friends)
  friendsId: User;
}
