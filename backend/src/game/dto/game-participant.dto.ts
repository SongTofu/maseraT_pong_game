import { GamePosition } from "../game-position.enum";

export class GameParticipantDto {
  gameRoomId: number;
  title: string;
  userId: number;
  userNickname: string;
  position: GamePosition;
}
