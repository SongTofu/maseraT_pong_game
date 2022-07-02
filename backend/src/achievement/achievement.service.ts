import { Injectable } from "@nestjs/common";
import { AchievementDto } from "./dto/achievement.dto";
import { User } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";
import { AchievementRepository } from "./achievement.repository";
import { Achievement } from "./achievement.entity";

@Injectable()
export class AchievementService {
  constructor(
    private userRepository: UserRepository,
    private achievementRepository: AchievementRepository,
  ) {}

  async getMyAchievement(id: number) {
    const user: User = await this.userRepository.findOne(id);
    const achievement: Achievement = await this.achievementRepository.findOne({
      where: { user },
    });
    const achievementDto: AchievementDto = {
      firstLogin: achievement.firstLogin,
      firstWin: achievement.firstWin,
      firstLose: achievement.firstLose,
      thirdWin: achievement.thirdWin,
    };
    return achievementDto;
  }

  async initAchievement(id: number): Promise<void> {
    const user: User = await this.userRepository.findOne(id);
    return this.achievementRepository.createDefaultAchievement(user);
  }

  async updateAchievement(id: number) {
    const user: User = await this.userRepository.findOne(id);
    let achievement: Achievement = await this.achievementRepository.findOne({
      where: { user },
    });
    if (user.nickname) achievement.firstLogin = true;
    if (achievement.firstWin == false && user.personalWin + user.ladderWin >= 1)
      achievement.firstWin = true; //조건 깔끔하게 못할까?
    if (
      achievement.firstLose == false &&
      user.personalLose + user.ladderLose >= 1
    )
      achievement.firstLose = true;
    if (achievement.thirdWin == false && user.personalWin + user.ladderWin >= 3)
      achievement.thirdWin = true;
    return achievement;
  }
}
