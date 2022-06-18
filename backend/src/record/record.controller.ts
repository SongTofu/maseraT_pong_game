import { Controller, Get, Param } from "@nestjs/common";
import { RecordService } from "./record.service";
import { RecordDto } from "./dto/record.dto";

@Controller("record")
export class RecordController {
  constructor(private recordService: RecordService) {}

  @Get("/:userId")
  getRecord(@Param("userId") id: number): Promise<RecordDto[]> {
    return this.recordService.getRecord(id);
  }
}
