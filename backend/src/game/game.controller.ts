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

  @Get("/participant/:gameRoomId")
  async gameParticipantList(
    @Param("gameRoodId") gameRoomId: number,
  ): Promise<GameParticipantDto[]> {
    return this.gameService.gameParticipantList(gameRoomId);
  }
}
