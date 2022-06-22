import { Injectable } from "@nestjs/common";
import { AchievementDto } from "./dto/achievement.dto";
import { User } from "src/user-info/entity/user.entity";
import { UserRepository } from "src/user-info/repository/user.repository";

@Injectable()
export class AchievementService {
  constructor(private userRepository: UserRepository) {}

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
