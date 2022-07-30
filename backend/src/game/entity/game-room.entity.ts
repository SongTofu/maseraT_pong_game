import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { GameParticipant } from "./game-participant.entity";

@Entity()
export class GameRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isStart: boolean;

  @Column()
  isSpeedMode: boolean; //true -> speed, false->nomal

  @Column()
  isLadder: boolean;

  @OneToMany((type) => GameParticipant, (gameParticipant) => gameParticipant.id)
  gameParticipant: GameParticipant[];
}
