import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "src/user/entity/user.entity";

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

  @OneToOne((type) => User, (user) => user.achievement)
  @JoinColumn()
  user: User;
}
