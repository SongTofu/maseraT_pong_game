import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "src/user/user.entity";

@Entity()
export class Achievement extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  firstLogin: boolean;

  @Column({ default: false })
  firstWin: boolean;

  @Column({ default: false })
  firstLose: boolean;

  @Column({ default: false })
  thirdWin: boolean;

  @Column({ default: false })
  consecThree: boolean;

  @OneToOne((type) => User, (user) => user.achievement)
  @JoinColumn()
  user: User;
}
