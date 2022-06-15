import { Module } from "@nestjs/common";
import { NicknameController } from "./nickname.controller";
import { NicknameService } from "./nickname.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/userinfo/user.repository";
import { UserinfoModule } from "src/userinfo/userinfo.module";

@Module({
  imports: [UserinfoModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [NicknameController],
  providers: [NicknameService],
})
export class NicknameModule {}
