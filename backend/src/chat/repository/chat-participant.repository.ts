import { EntityRepository, Repository } from "typeorm";
import { ChatParticipant } from "../entity/chat-participant.entity";

@EntityRepository(ChatParticipant)
export class ChatParticipantRepository extends Repository<ChatParticipant> {
  async deleteAllParticipants(chatRoomId: number) {
    const chatParticipants: ChatParticipant[] = await this.find({
      where: { chatRoom: chatRoomId },
    });
    if (!chatParticipants) return;
    chatParticipants.forEach((chatParticipant) => {
      this.delete(chatParticipant);
    });
  }
}
