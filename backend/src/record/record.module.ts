import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecordRepository } from "./record.repository";
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  imports: [TypeOrmModule.forFeature([RecordRepository])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
