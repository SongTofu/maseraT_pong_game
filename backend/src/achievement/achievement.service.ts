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
    if (!user) throw new NotFoundException(`Can't find User with id ${id}`); //나중에 접속한 사람 확인되면 삭제가능

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
    };
    return achievementDto;
  }

  async updateAchievement(id: number): Promise<Achievement> {
    const user: User = await this.userRepository.findOne(id);
    let achievement: Achievement = await this.achievementRepository.findOne({
      where: { user },
    });
    // 게임 생기면 조건 추가
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
    return achievement;
  }

  async getTargetAchievement(targetId: number): Promise<AchievementDto> {
    const target = await this.userRepository.findOne(targetId);
    if (!target)
      throw new NotFoundException(`Can't find Target with id ${targetId}`); //나중에 접속한 사람 확인되면 삭제가능

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
    };

    return targetAchievementDto;
  }
}
