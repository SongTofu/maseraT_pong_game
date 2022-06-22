import { EntityRepository, Repository } from "typeorm";
import { Achievement } from "./achievement.entity";

@EntityRepository(Achievement)
export class AchievementRepository extends Repository<Achievement> {}
