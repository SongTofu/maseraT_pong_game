import { Repository, EntityRepository } from "typeorm";
import { GameJoinDto } from "../dto/game-room.dto";
import { GameRoom } from "../entity/game-room.entity";

@EntityRepository(GameRoom)
export class GameRoomRepository extends Repository<GameRoom> {
  async createRoom(gameJoinDto: GameJoinDto): Promise<number> {
    const { title } = gameJoinDto;

    const gameRoom: GameRoom = this.create({
      title,
    });

    const saveRoom = await gameRoom.save();

    return saveRoom.id;
  }
}
