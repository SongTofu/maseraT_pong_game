import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class SecondAuthCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authCode: string;

  @OneToOne((type) => User, (user) => user.secondAuthCode)
  @JoinColumn()
  user: User;
}
