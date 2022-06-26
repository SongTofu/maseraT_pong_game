import { Controller, Patch, Get, Body, Post } from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { AchievementDto } from "./dto/achievement.dto";

@Controller("achievement")
export class AchievementController {
  constructor(private achievementServie: AchievementService) {}

  @Get()
  getMyAchievement() {
    return this.achievementServie.getMyAchievement(1);
  }

  @Post()
  initAchievement(): Promise<void> {
    return this.achievementServie.initAchievement(1);
  }

  @Patch()
  updateAchievement(): Promise<AchievementDto> {
    return this.achievementServie.updateAchievement(1);
  }
}
