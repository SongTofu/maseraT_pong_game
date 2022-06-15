import { Module } from "@nestjs/common";
import { NicknameController } from "./nickname.controller";
import { NicknameService } from "./nickname.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/user-info/user.repository";
import { UserInfoModule } from "src/user-info/user-info.module";

@Module({
  imports: [UserInfoModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [NicknameController],
  providers: [NicknameService],
})
export class NicknameModule {}
