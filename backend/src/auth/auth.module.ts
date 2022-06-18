import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/user-info/repository/user.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { UserInfoModule } from "src/user-info/user-info.module";

@Module({
  imports: [
    UserInfoModule,
    JwtModule.register({
      secret: "1234",
      // secret: CLIENT_SECRET,
      signOptions: { expiresIn: 3600 },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
