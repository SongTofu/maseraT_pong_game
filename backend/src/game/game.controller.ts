import { Controller, Get, Param } from "@nestjs/common";
import { GameParticipantDto } from "./dto/game-participant.dto";
import { GameService } from "./game.service";
import { GameRoomDetailDto } from "./dto/game-room-detail.dto";
import { GameRoom } from "./entity/game-room.entity";

@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}

  @Get("/room")
  async gameRoomList(): Promise<GameRoom[]> {
    return this.gameService.gameRoomList();
  }

  @Get("/room/:gameRoomId")
  async gameRoomDetail(
    @Param("gameRoomId") gameRoomId: number,
  ): Promise<GameRoomDetailDto> {
    return this.gameService.gameRoomDetail(gameRoomId);
  }
}
