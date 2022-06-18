import { EntityRepository, Repository } from "typeorm";
import { ChatRoom } from "../entity/chat-room.entity";

@EntityRepository(ChatRoom)
export class ChatRoomRepository extends Repository<ChatRoom> {}
