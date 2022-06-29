import { Controller, Get } from "@nestjs/common";
import { GetAllBlockDto } from "./dto/get-all-block.dto";
import { BlockService } from "./block.service";

@Controller("block")
export class BlockController {
  constructor(private blockService: BlockService) {}

  @Get("/block")
  getAllBlock(): Promise<GetAllBlockDto[]> {
    return this.blockService.getAllBlock();
  }
}
