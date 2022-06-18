import { EntityRepository, Repository } from "typeorm";
import { ChatParticipants } from "../entity/chat-participants.entity";

@EntityRepository(ChatParticipants)
export class ChatParticipantsRepository extends Repository<ChatParticipants> {}
