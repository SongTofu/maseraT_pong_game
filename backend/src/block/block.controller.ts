import {
  Controller,
  Get,
  Req,
  UseGuards,
  Post,
  Body,
  Delete,
} from "@nestjs/common";
import { GetAllBlockDto } from "./dto/get-all-block.dto";
import { BlockService } from "./block.service";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";

@Controller("block")
@UseGuards(JwtAuthGuard)
export class BlockController {
  constructor(private blockService: BlockService) {}

  @Get()
  getAllBlock(@Req() req): Promise<GetAllBlockDto[]> {
    const id = req.user.id;

    return this.blockService.getAllBlock(id);
  }

  @Post()
  addBlock(
    @Req() req,
    @Body("targetId") targetId: number,
  ): Promise<{ isSuccess: boolean }> {
    return this.blockService.addBlock(req.user.id, targetId);
  }

  @Delete()
  deleteBlock(
    @Req() req,
    @Body("targetId") targetId: number,
  ): Promise<{ isSuccess: boolean }> {
    return this.blockService.deleteBlock(req.user.id, targetId);
  }
}
