import { Controller, Get, Param } from "@nestjs/common";
import { GameParticipantDto } from "./dto/game-participant.dto";
import { GameService } from "./game.service";
import { GameRoomDetailDto } from "./dto/game-room-detail.dto";

@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}

  @Get("/room")
  async gameRoomList() {
    return this.gameService.gameRoomList();
  }

  @Get("/participant/:gameRoomId")
  async gameParticipantList(
    @Param("gameRoodId") gameRoomId: number,
  ): Promise<GameParticipantDto[]> {
    return this.gameService.gameParticipantList(gameRoomId);
  }
}
