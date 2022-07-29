import { NotFoundException } from "@nestjs/common";
import { Repository, EntityRepository } from "typeorm";
import { GameRoom } from "../entity/game-room.entity";
import { GameJoinDto } from "../dto/game-room-join.dto";

@EntityRepository(GameRoom)
export class GameRoomRepository extends Repository<GameRoom> {
  async createRoom(gameJoinDto: GameJoinDto): Promise<number> {
    const { title, isSpeedMode, isLadder } = gameJoinDto;

    const gameRoom: GameRoom = this.create({
      title,
      isStart: false,
      isSpeedMode: isSpeedMode,
      isLadder: isLadder,
    });

    const saveRoom = await gameRoom.save();
    gameJoinDto.gameRoomId = saveRoom.id;
    return saveRoom.id;
  }

  async deleteRoom(gameRoomId: number): Promise<void> {
    const result = await this.delete(gameRoomId);

    if (!result.affected) {
      throw new NotFoundException(`Can't find GameRoom with id ${gameRoomId}`);
    }
  }
}
