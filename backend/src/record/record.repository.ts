import { EntityRepository, Repository } from "typeorm";
import { Record } from "./record.entity";
import { User } from "src/user/user.entity";

@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
  gameEnd(
    isLadder: boolean,
    gameWin: boolean,
    leftUser: User,
    rightUser: User,
  ) {
    const date = this.createDate();
    const record: Record = this.create({
      date,
      isLadder,
      gameWin,
      user: leftUser,
      enemy: rightUser,
    });
    record.save();

    const reverseRecord: Record = this.create({
      date,
      isLadder,
      gameWin: !gameWin,
      user: rightUser,
      enemy: leftUser,
    });
    reverseRecord.save();
  }

  private createDate(): string {
    const currentDate: Date = new Date();
    const date: string =
      currentDate.getFullYear() +
      "." +
      currentDate.getMonth() +
      1 +
      "." +
      currentDate.getDay() +
      " " +
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes();
    return date;
  }
}
