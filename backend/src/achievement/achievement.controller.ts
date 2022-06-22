import { Controller, Patch, Get, Body } from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { AchievementDto } from "./dto/achievement.dto";

@Controller("achievement")
export class AchievementController {
  constructor(private achievementServie: AchievementService) {}

  @Get()
  getMyAchievement(@Body() id: number): Promise<AchievementDto> {
    return this.achievementServie.getMyAchievement(id);
  }

  @Patch()
  updateAchievement(@Body() id: number): Promise<AchievementDto> {
    return this.achievementServie.updateAchievement(id);
  }
}
