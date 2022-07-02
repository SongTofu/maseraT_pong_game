import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDto } from "src/auth/dto/user.dto";
import { Block } from "./block.entity";
import { BlockRepository } from "./block.repository";
import { GetAllBlockDto } from "./dto/get-all-block.dto";

@Injectable()
export class BlockService {
  constructor(private blockRepository: BlockRepository) {}

  async getAllBlock(userDto: UserDto): Promise<GetAllBlockDto[]> {
    const getAllBlockDto: GetAllBlockDto[] = [];
    const block: Block[] = await this.blockRepository.find({
      where: {
        userID: userDto.apiId,
      },
    });

    if (!block) {
      throw new NotFoundException(`Nodody block`);
    }

    for (let i = 0; i < block.length; i++) {
      getAllBlockDto.push({
        userID: block[i].blockId.id,
        nickname: block[i].blockId.nickname,
        state: block[i].blockId.state,
      });

      return getAllBlockDto;
    }
  }
}
