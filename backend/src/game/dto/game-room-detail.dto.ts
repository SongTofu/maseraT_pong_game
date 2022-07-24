import { GameRoom } from "../entity/game-room.entity";
import { GameParticipantDto } from "./game-participant.dto";
import { GameParticipant } from "../entity/game-participant.entity";

export class GameRoomDetailDto {
  constructor(gameRoom: GameRoom, participants: GameParticipant[]) {
    this.gameRoomId = gameRoom.id;
    this.title = gameRoom.title;
    participants.forEach((participant) => {
      this.gameParticipant.push(new GameParticipantDto(participant));
    });
  }
  gameRoomId: number;
  title: string;
  gameParticipant: GameParticipantDto[] = [];
}
