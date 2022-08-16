import { Injectable, NotFoundException } from "@nestjs/common";
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

  async getMyAchievement(id: number): Promise<AchievementDto> {
    const user: User = await this.userRepository.findOne(id);
    this.updateAchievement(user);
    const achievement: Achievement = await this.achievementRepository.findOne({
      where: {
        user: user.id,
      },
    });
    const achievementDto: AchievementDto = {
      userId: user.id,
      firstLogin: achievement.firstLogin,
      firstWin: achievement.firstWin,
      firstLose: achievement.firstLose,
      thirdWin: achievement.thirdWin,
      consecThree: achievement.consecThree,
    };
    return achievementDto;
  }

  async updateAchievement(user: User): Promise<Achievement> {
    const achievement: Achievement = await this.achievementRepository.findOne({
      where: { user },
    });

    if (user.nickname) achievement.firstLogin = true;
    if (achievement.firstWin == false && user.personalWin + user.ladderWin >= 1)
      achievement.firstWin = true;
    if (
      achievement.firstLose == false &&
      user.personalLose + user.ladderLose >= 1
    )
      achievement.firstLose = true;
    if (achievement.thirdWin == false && user.personalWin + user.ladderWin >= 3)
      achievement.thirdWin = true;
    await achievement.save();
    return achievement;
  }

  async getTargetAchievement(targetId: number): Promise<AchievementDto> {
    const target = await this.userRepository.findOne(targetId);
    this.updateAchievement(target);

    const achievement: Achievement = await this.achievementRepository.findOne({
      where: {
        user: target.id,
      },
    });

    const targetAchievementDto: AchievementDto = {
      userId: targetId,
      firstLogin: achievement.firstLogin,
      firstWin: achievement.firstWin,
      firstLose: achievement.firstLose,
      thirdWin: achievement.thirdWin,
      consecThree: achievement.consecThree,
    };

    return targetAchievementDto;
  }
}
