import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlockController } from "./block.controller";
import { BlockRepository } from "./block.repository";
import { BlockService } from "./block.service";

@Module({
  imports: [TypeOrmModule.forFeature([BlockRepository])],
  controllers: [BlockController],
  providers: [BlockService],
})
export class BlockModule {}
