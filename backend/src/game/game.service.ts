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

  async gameRoomDetail(gameRoomId: number): Promise<GameRoomDetailDto> {
    const gameParticipants: GameParticipant[] =
      await this.gameParticipantRepository.find({
        where: { gameRoom: gameRoomId },
        relations: ["user"],
      });

    const gameRoom: GameRoom = await this.gameRoomRepository.findOne(
      gameRoomId,
    );
    const gameParticipantDto: GameParticipantDto[] = [];

    gameParticipants.forEach((gameParticipant) => {
      gameParticipantDto.push(new GameParticipantDto(gameParticipant));
    });

    const gameRoomDetailDto: GameRoomDetailDto = {
      gameRoomId: gameRoomId,
      title: gameRoom.title,
      gameParticipant: gameParticipantDto,
    };
    return gameRoomDetailDto;
  }
}
