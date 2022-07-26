import { Injectable } from "@nestjs/common";
import { GameRoomRepository } from "./repository/game-room.repository";
import { GameParticipantRepository } from "./repository/game-participant.repository";
import { GameParticipant } from "./entity/game-participant.entity";
import { GameParticipantDto } from "./dto/game-participant.dto";
import { GameRoomDetailDto } from "./dto/game-room-detail.dto";
import { GameRoom } from "./entity/game-room.entity";

@Injectable()
export class GameService {
  constructor(
    private gameRoomRepository: GameRoomRepository,
    private gameParticipantRepository: GameParticipantRepository,
  ) {}

  async gameRoomList(): Promise<GameRoom[]> {
    return await this.gameRoomRepository.find();
  }

  async gameParticipantList(gameRoomId: number): Promise<GameParticipantDto[]> {
    const gameParticipants: GameParticipant[] =
      await this.gameParticipantRepository.find({
        where: { gameRoom: gameRoomId },
        relations: ["user"],
      });

    const gameParticipantDto: GameParticipantDto[] = [];

    gameParticipants.forEach((gameParticipant) => {
      gameParticipantDto.push(new GameParticipantDto(gameParticipant));
    });

    return gameParticipantDto;
  }
}
