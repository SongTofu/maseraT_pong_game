import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from "@nestjs/common";
import { GameService } from "./game.service";
import { GameRoomDetailDto } from "./dto/game-room-detail.dto";
import { GameRoom } from "./entity/game-room.entity";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";

@Controller("game")
export class GameController {
  constructor(private gameService: GameService) {}

  @Get("/room")
  async gameRoomList(): Promise<GameRoom[]> {
    return this.gameService.gameRoomList();
  }

  @Get("/room/:gameRoomId")
  @UseGuards(JwtAuthGuard)
  async gameRoomDetail(
    @Req() req,
    @Param("gameRoomId", ParseIntPipe) gameRoomId: number,
  ): Promise<GameRoomDetailDto> {
    return this.gameService.gameRoomDetail(req.user.id, gameRoomId);
  }
}
