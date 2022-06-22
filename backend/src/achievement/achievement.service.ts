import { Injectable } from "@nestjs/common";
import { AchievementDto } from "./dto/achievement.dto";
import { User } from "src/user-info/entity/user.entity";
import { UserRepository } from "src/user-info/repository/user.repository";
import { AchievementRepository } from "./achievement.repository";
import { Achievement } from "./achievement.entity";

@Injectable()
export class AchievementService {
  constructor(
    private userRepository: UserRepository,
    private achievementRepository: AchievementRepository,
  ) {}

  async getMyAchievement(id: number): Promise<AchievementDto> {
    const achievement: Achievement = await this.achievementRepository.findOne(
      id,
    );

    const achievementDto = achievement; //이렇게 넣으면 걍 알아서 들어갈 것 같음,, 테스트 안해봄
    return achievementDto;
  }

  async updateAchievement(id: number): Promise<AchievementDto> {
    const user: User = await this.userRepository.findOne(id);
    let achievementDto: AchievementDto;
    if (user.nickname) achievementDto.firstLogin = true;
    if (user.personalWin + user.ladderWin == 1) achievementDto.firstWin = true;
    if (user.personalLose + user.ladderLose == 1)
      achievementDto.firstLose = true;
    if (user.personalWin + user.ladderWin == 3) achievementDto.thirdWin = true;
    return achievementDto;
  }
}
