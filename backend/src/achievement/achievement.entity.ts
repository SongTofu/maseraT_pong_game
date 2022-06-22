import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { User } from "src/user-info/entity/user.entity";

@Entity()
export class Achievement extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstLogin: boolean;

  @Column()
  firstWin: boolean;

  @Column()
  firstLose: boolean;

  @Column()
  thirdWin: boolean;

  @ManyToOne((type) => User, (user) => user.achievement)
  user: User;
}
