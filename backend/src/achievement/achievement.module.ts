import { Module } from "@nestjs/common";
import { AchievementController } from "./achievement.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AchievementRepository } from "./achievement.repository";
import { AchievementService } from "./achievement.service";
import { UserRepository } from "src/user/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, AchievementRepository])],
  controllers: [AchievementController],
  providers: [AchievementService],
})
export class AchievementModule {}
