import { EntityRepository, Repository } from "typeorm";
import { GameParticipant } from "../entity/game-participant.entity";

@EntityRepository(GameParticipant)
export class GameParticipantRepository extends Repository<GameParticipant> {
  async deleteAllParticipants(gameRoomId: number) {
    const gameParticipants: GameParticipant[] = await this.find({
      where: { gameRoom: gameRoomId },
    });
    if (!gameParticipants) return;
    gameParticipants.forEach((gameParticipant) => {
      this.delete(gameParticipant);
    });
  }
}
