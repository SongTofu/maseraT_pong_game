import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Block extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (user) => user.block, { eager: false })
  ownId: User;

  @ManyToOne((type) => User, (user) => user.block, { eager: false })
  blockId: User;
}
