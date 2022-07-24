import { GamePosition } from "../game-position.enum";
import { GameParticipant } from "../entity/game-participant.entity";

export class GameParticipantDto {
  constructor(gameParticipant: GameParticipant) {
    this.gameRoomId = gameParticipant.gameRoom.id;
    this.title = gameParticipant.gameRoom.title;
    this.userId = gameParticipant.user.id;
    this.nickname = gameParticipant.user.nickname;
    this.position = gameParticipant.position;
  }
  gameRoomId: number;
  title: string;
  userId: number;
  nickname: string;
  position: GamePosition;
}
