import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlockController } from "./block.controller";
import { BlockRepository } from "./block.repository";
import { BlockService } from "./block.service";
import { UserRepository } from "src/user/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([BlockRepository, UserRepository])],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}
