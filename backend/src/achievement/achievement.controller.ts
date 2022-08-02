import { Controller, Patch, Get, Param, Req, UseGuards } from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { AchievementDto } from "./dto/achievement.dto";
import { Achievement } from "./achievement.entity";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";

@Controller("achievement")
@UseGuards(JwtAuthGuard)
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
