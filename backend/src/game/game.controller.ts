import { Controller, Get, Param } from "@nestjs/common";
import { GameParticipantDto } from "./dto/game-participant.dto";
import { GameService } from "./game.service";

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
