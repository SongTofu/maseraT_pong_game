import { EntityRepository, Repository } from "typeorm";
import { Block } from "../entity/block.entity";

@EntityRepository(Block)
export class BlockRepository extends Repository<Block> {}
