import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "../user-info/entity/user.entity";

@Entity()
export class SecondAuthCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authCode: string;

  @ManyToOne((type) => User, (user) => user.secondAuthCode, { eager: false })
  user: User;
}
