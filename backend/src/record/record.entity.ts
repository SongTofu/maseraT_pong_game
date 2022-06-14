import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { User } from "src/user/user.entity";

@Entity()
export class Record extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isLadder: boolean;

  @Column()
  gameWin: boolean;

  @ManyToOne((type) => User, (user) => user.record, { eager: false })
  user: User;
}
