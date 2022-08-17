import { EntityRepository, Repository } from "typeorm";
import { Record } from "./record.entity";
import { User } from "src/user/user.entity";

@EntityRepository(Record)
export class RecordRepository extends Repository<Record> {
  async gameEnd(
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

    if (gameWin) {
      if (isLadder) {
        leftUser.ladderWin++;
        rightUser.ladderLose++;
      } else {
        leftUser.personalWin++;
        rightUser.personalLose++;
      }
      leftUser.level = +leftUser.level + 0.7;
    } else {
      if (isLadder) {
        leftUser.ladderLose++;
        rightUser.ladderWin++;
      } else {
        leftUser.personalLose++;
        rightUser.personalWin++;
      }
      rightUser.level = +rightUser.level + 0.7;
    }
    await rightUser.save();
    await leftUser.save();
  }

  private createDate(): string {
    const currentDate: Date = new Date();
    const date: string =
      currentDate.getFullYear() +
      "." +
      (currentDate.getMonth() + 1) +
      "." +
      currentDate.getDay() +
      " " +
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes();
    return date;
  }
}
