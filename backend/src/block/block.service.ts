import { Injectable, NotFoundException } from "@nestjs/common";
import { Block } from "./block.entity";
import { BlockRepository } from "./block.repository";
import { GetAllBlockDto } from "./dto/get-all-block.dto";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.entity";

@Injectable()
export class BlockService {
  constructor(
    private blockRepository: BlockRepository,
    private userRepository: UserRepository,
  ) {}

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

  async addBlock(
    id: number,
    targetId: number,
  ): Promise<{ isSuccess: boolean }> {
    const user: User = await this.userRepository.findOne(id);
    const target: User = await this.userRepository.findOne(targetId);

    const block: Block = this.blockRepository.create({
      ownId: user,
      blockId: target,
    });

    await block.save();

    return { isSuccess: true };
  }

  async deleteBlock(
    id: number,
    targetId: number,
  ): Promise<{ isSuccess: boolean }> {
    const block: Block = await this.blockRepository.findOne({
      where: {
        ownId: id,
        blockId: targetId,
      },
    });

    await this.blockRepository.remove(block);
    return { isSuccess: true };
  }
}
