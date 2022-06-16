import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/userinfo/user.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from "passport-42";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { UserinfoModule } from "src/userinfo/userinfo.module";

@Module({
  imports: [
    UserinfoModule,
    PassportModule,
    JwtModule.register({
      secret: CLIENT_SECRET,
      signOptions: { expiresIn: 3600 },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
