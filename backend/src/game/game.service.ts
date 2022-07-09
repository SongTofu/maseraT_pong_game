import { Injectable } from "@nestjs/common";
import { GameRoomRepository } from "./repository/game-room.repository";

@Injectable()
export class GameService {
  constructor(private gameJoinRepository: GameRoomRepository) {}

  async getAllGameRoomList() {
    // const gameRoom = this.gameJoinRepository.
  }
}
