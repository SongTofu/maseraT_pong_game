import { Injectable } from "@nestjs/common";
import { GameRoomRepository } from "./repository/game-room.repository";
import { GameParticipantRepository } from "./repository/game-participant.repository";
import { GameParticipant } from "./entity/game-participant.entity";
import { GameParticipantDto } from "./dto/game-participant.dto";

@Injectable()
export class GameService {
  constructor(
    private gameJoinRepository: GameRoomRepository,
    private gameParticipantRepository: GameParticipantRepository,
  ) {}

  async gameRoomList() {
    return await this.gameJoinRepository.find();
  }

  async gameParticipantList(gameRoomId: number): Promise<GameParticipantDto[]> {
    const gameParticipants: GameParticipant[] =
      await this.gameParticipantRepository.find({
        where: { gameRoom: gameRoomId },
        relations: ["User"],
      });

    const gameParticipantDto: GameParticipantDto[] = [];

    gameParticipants.forEach((gameParticipant) => {
      gameParticipantDto.push(new GameParticipantDto());
    });

    return gameParticipantDto;
  }
}
