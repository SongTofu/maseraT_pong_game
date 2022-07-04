import { EntityRepository, Repository } from "typeorm";
import { GameParticipant } from "../entity/game-participant.entity";

@EntityRepository(GameParticipant)
export class GameParticipantRepository extends Repository<GameParticipant> {}
