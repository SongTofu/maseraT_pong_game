import { EntityRepository, Repository } from "typeorm";
import { Achievement } from "./achievement.entity";
import { User } from "src/user/entity/user.entity";

@EntityRepository(Achievement)
export class AchievementRepository extends Repository<Achievement> {
  async createDefaultAchievement(user: User): Promise<void> {
    const achievement = this.create({
      firstLogin: false,
      firstWin: false,
      firstLose: false,
      thirdWin: false,
      user,
    });
    console.log("ache", achievement);
    await this.save(achievement);
  }
}
