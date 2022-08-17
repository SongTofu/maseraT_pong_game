import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/user/user.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { FtStrategy } from "./42-auth.strategy";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { AchievementRepository } from "src/achievement/achievement.repository";
import { SecondAuthService } from "src/second-auth/second-auth.service";
import { SecondAuthRepository } from "src/second-auth/second-auth.repository";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      UserRepository,
      AchievementRepository,
      SecondAuthRepository,
    ]),
    PassportModule.register({ defaultStrategy: "42" }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: 3600 * 24 * 365 },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, FtStrategy, JwtStrategy, SecondAuthService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
