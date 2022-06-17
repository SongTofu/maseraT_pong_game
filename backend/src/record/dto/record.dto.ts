import { Record } from "../record.entity";

export class RecordDto {
  constructor(record: Record) {
    this.enemy = record.enemy.nickname;
    this.date = record.date;
    this.isLadder = record.isLadder;
    this.gameWin = record.gameWin;
  }
  enemy: string;
  date: string;
  isLadder: boolean;
  gameWin: boolean;
}
