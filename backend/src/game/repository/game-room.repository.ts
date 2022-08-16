import { Repository, EntityRepository } from "typeorm";
import { GameRoom } from "../entity/game-room.entity";
import { GameJoinDto } from "../dto/game-room-join.dto";
import { BallData } from "../data/ball-data";
import { UserData } from "../data/user-data";

@EntityRepository(GameRoom)
export class GameRoomRepository extends Repository<GameRoom> {
  async createRoom(
    gameJoinDto: GameJoinDto,
    gameData: Object,
  ): Promise<number> {
    const { title, isSpeedMode, isLadder } = gameJoinDto;

    const gameRoom: GameRoom = this.create({
      title,
      isStart: false,
      isSpeedMode: isSpeedMode,
      isLadder: isLadder,
    });

    const saveRoom = await gameRoom.save();
    gameJoinDto.gameRoomId = saveRoom.id;

    gameData[saveRoom.id] = {};
    gameData[saveRoom.id].ball = new BallData();
    gameData[saveRoom.id].leftUser = new UserData(true);
    gameData[saveRoom.id].rightUser = new UserData(false);
    gameData[saveRoom.id].isLadder = isLadder;
    gameData[saveRoom.id].isSpeedMode = isSpeedMode;

    return saveRoom.id;
  }

  async deleteRoom(gameRoomId: number): Promise<void> {
    await this.delete(gameRoomId);
  }
}
