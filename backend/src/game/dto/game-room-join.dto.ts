import { GamePosition } from "../game-position.enum";

export class GameJoinDto {
  gameRoomId: number;
  title: string;
  userId: number;
  isSpeedMode: boolean;
  isLadder: boolean;
}
