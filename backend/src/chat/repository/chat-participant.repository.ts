import { EntityRepository, Repository } from "typeorm";
import { ChatParticipant } from "../entity/chat-participant.entity";

@EntityRepository(ChatParticipant)
export class ChatParticipantRepository extends Repository<ChatParticipant> {}
