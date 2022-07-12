import { Controller, Patch, Get, Post, Param, Req } from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { AchievementDto } from "./dto/achievement.dto";
import { Achievement } from "./achievement.entity";

@Controller("achievement")
export class AchievementController {
  constructor(private achievementServie: AchievementService) {}

  @Get()
  getMyAchievement(@Req() req): Promise<AchievementDto> {
    return this.achievementServie.getMyAchievement(req.user.id);
  }

  @Patch()
  updateAchievement(@Req() req): Promise<Achievement> {
    return this.achievementServie.updateAchievement(req.user.id);
  }

  @Get("/:targetId")
  getTargetAchievement(
    @Param("targetId") targetId: number,
  ): Promise<AchievementDto> {
    return this.achievementServie.getTargetAchievement(targetId);
  }
}
