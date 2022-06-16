import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "src/user-info/entity/user.entity";

@Entity()
export class Record extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isLadder: boolean;

  @Column()
  gameWin: boolean;

  @OneToOne((type) => User, (user) => user.record, { eager: false })
  @JoinColumn()
  user: User;
}
