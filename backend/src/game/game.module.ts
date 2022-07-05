import { Module } from "@nestjs/common";
import { GameGateway } from "./game.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameRoomRepository } from "./repository/game-room.repository";
import { GameParticipantRepository } from "./repository/game-participant.repository";
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameRoomRepository, GameParticipantRepository]),
  ],
  providers: [GameGateway, GameService],
  controllers: [GameController],
})
export class GameModule {}
