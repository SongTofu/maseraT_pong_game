import { GamePosition } from "../game-position.enum";
import { User } from "src/user/user.entity";

export class GameParticipantProfile {
  constructor(gameParticipant: User, position: GamePosition) {
    if (gameParticipant) {
      this.userId = gameParticipant.id;
      this.nickname = gameParticipant.nickname;
      this.level = gameParticipant.level;
      this.personalWin = gameParticipant.personalWin;
      this.personalLose = gameParticipant.personalLose;
      this.ladderWin = gameParticipant.ladderWin;
      this.ladderLose = gameParticipant.ladderLose;
      this.profileImg = gameParticipant.profileImg;
    }
    this.position = position;
  }
  userId: number = 0;
  position: GamePosition = 2;
  nickname: string = "";
  level: number = 0;
  personalWin: number = 0;
  personalLose: number = 0;
  ladderWin: number = 0;
  ladderLose: number = 0;
  profileImg: string = "maserat.png";
}
