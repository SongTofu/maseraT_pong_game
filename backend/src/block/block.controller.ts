import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GetAllBlockDto } from "./dto/get-all-block.dto";
import { BlockService } from "./block.service";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { UserDto } from "src/auth/dto/user.dto";

@Controller("block")
@UseGuards(JwtAuthGuard)
export class BlockController {
  constructor(private blockService: BlockService) {}

  @Get()
  getAllBlock(@Req() req): Promise<GetAllBlockDto[]> {
    const id = req.user.id;

    return this.blockService.getAllBlock(id);
  }
}
