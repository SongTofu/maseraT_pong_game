import { EntityRepository, Repository } from "typeorm";
import { Achievement } from "./achievement.entity";
import { User } from "src/user/user.entity";

@EntityRepository(Achievement)
export class AchievementRepository extends Repository<Achievement> {
  async createDefaultAchievement(user: User): Promise<Achievement> {
    const achievement = this.create({
      user,
    });
    await this.save(achievement);
    return achievement;
  }
}
