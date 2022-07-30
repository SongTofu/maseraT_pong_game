import { Controller, Get, Param, UseGuards, Req } from "@nestjs/common";
import { RecordService } from "./record.service";
import { RecordDto } from "./dto/record.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";

@Controller("record")
export class RecordController {
  constructor(private recordService: RecordService) {}

  @Get("/:userId")
  getRecord(@Param("userId") id: number): Promise<RecordDto[]> {
    return this.recordService.getRecord(id);
  }

  @Get("")
  @UseGuards(JwtAuthGuard)
  getMeRecord(@Req() req): Promise<RecordDto[]> {
    return this.recordService.getRecord(req.user.id);
  }
}
