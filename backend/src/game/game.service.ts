import { Injectable, BadRequestException } from "@nestjs/common";
import { GameRoomRepository } from "./repository/game-room.repository";
import { GameParticipantRepository } from "./repository/game-participant.repository";
import { GameParticipant } from "./entity/game-participant.entity";
import { GameRoomDetailDto } from "./dto/game-room-detail.dto";
import { GameRoom } from "./entity/game-room.entity";
import { GameParticipantProfile } from "./dto/game-participant-profile.dto";
import { GamePosition } from "./game-position.enum";

@Injectable()
export class GameService {
  constructor(
    private gameRoomRepository: GameRoomRepository,
    private gameParticipantRepository: GameParticipantRepository,
  ) {}

  async gameRoomList(): Promise<GameRoom[]> {
    const gameRoom: GameRoom[] = await this.gameRoomRepository.find();
    return gameRoom.filter((game) => !game.isLadder);
  }

  async gameRoomDetail(
    userId: number,
    gameRoomId: number,
  ): Promise<GameRoomDetailDto> {
    const gameRoom: GameRoom = await this.gameRoomRepository.findOne(
      gameRoomId,
    );

    const user: GameParticipant = await this.gameParticipantRepository.findOne({
      where: { gameRoom, user: userId },
      relations: ["user"],
    });

    if (!gameRoom || !user) {
      throw new BadRequestException();
    }
    const leftgameParticipant: GameParticipant =
      await this.gameParticipantRepository.findOne({
        where: { gameRoom, position: GamePosition.leftUser },
        relations: ["user"],
      });

    const rightgameParticipant: GameParticipant =
      await this.gameParticipantRepository.findOne({
        where: { gameRoom, position: GamePosition.rightUser },
        relations: ["user"],
      });

    const gameRoomDetailDto: GameRoomDetailDto = {
      gameRoomId: gameRoomId,
      title: gameRoom.title,
      isLadder: gameRoom.isLadder,
      gameUser: [],
    };

    if (!leftgameParticipant)
      gameRoomDetailDto.gameUser.push(
        new GameParticipantProfile(null, GamePosition.leftUser),
      );
    else {
      gameRoomDetailDto.gameUser.push(
        new GameParticipantProfile(
          leftgameParticipant.user,
          GamePosition.leftUser,
        ),
      );
    }
    if (!rightgameParticipant)
      gameRoomDetailDto.gameUser.push(
        new GameParticipantProfile(null, GamePosition.rightUser),
      );
    else {
      gameRoomDetailDto.gameUser.push(
        new GameParticipantProfile(
          rightgameParticipant.user,
          GamePosition.rightUser,
        ),
      );
    }

    return gameRoomDetailDto;
  }
}
