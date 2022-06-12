import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecordRepository } from "./record.repository";

@Module({
  imports: [TypeOrmModule.forFeature([RecordRepository])],
})
export class RecordModule {}
