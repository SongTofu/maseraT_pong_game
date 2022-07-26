import { Injectable } from "@nestjs/common";
import { RecordRepository } from "./record.repository";
import { RecordDto } from "./dto/record.dto";
import { Record } from "./record.entity";

@Injectable()
export class RecordService {
  constructor(private recordRepository: RecordRepository) {}

  async getRecord(id: number): Promise<RecordDto[]> {
    const records: Record[] = await this.recordRepository.find({
      where: { user: id },
      relations: ["enemy"],
      order: {
        date: -1,
      },
    });

    const recordDto: RecordDto[] = [];

    records.forEach((record) => {
      recordDto.push(new RecordDto(record));
    });
    return recordDto;
  }
}
