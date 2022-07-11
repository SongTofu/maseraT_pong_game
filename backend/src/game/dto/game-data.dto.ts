import { GamePosition } from "../game-position.enum";

export class GameDataDto {
  gameRoomId: number;
  position: GamePosition;
  y: number;
}
