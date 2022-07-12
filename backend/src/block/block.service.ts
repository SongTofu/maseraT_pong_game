import { Injectable, NotFoundException } from "@nestjs/common";
import { Block } from "./block.entity";
import { BlockRepository } from "./block.repository";
import { GetAllBlockDto } from "./dto/get-all-block.dto";

@Injectable()
export class BlockService {
  constructor(private blockRepository: BlockRepository) {}

  async getAllBlock(id): Promise<GetAllBlockDto[]> {
    const getAllBlockDto: GetAllBlockDto[] = [];
    const blocks: Block[] = await this.blockRepository.find({
      where: {
        ownId: id,
      },
      relations: ["blockId"],
    });

    if (!blocks) {
      throw new NotFoundException(`Nodody block`);
    }

    blocks.forEach((block) => {
      getAllBlockDto.push(new GetAllBlockDto(block.blockId));
    });

    return getAllBlockDto;
  }
}
