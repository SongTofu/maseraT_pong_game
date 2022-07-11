import { Module } from "@nestjs/common";
import { NicknameController } from "./nickname.controller";
import { NicknameService } from "./nickname.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/user/user.repository";
import { UserModule } from "src/user/user.module";

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [NicknameController],
  providers: [NicknameService],
})
export class NicknameModule {}
