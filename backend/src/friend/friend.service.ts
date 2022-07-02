import { Injectable, NotFoundException } from "@nestjs/common";
import { GetAllFriendsDto } from "./dto/get-all-friends.dto";
import { Friends } from "./friends.entity";
import { FriendsRepository } from "./friends.repository";

@Injectable()
export class FriendService {
  constructor(private friendsRository: FriendsRepository) {}

  async getAllFriends(): Promise<GetAllFriendsDto[]> {
    const getAllFriendsDto: GetAllFriendsDto[] = [];
    const friends: Friends[] = await this.friendsRository.find();

    if (!friends) {
      throw new NotFoundException(`Nobody friends exist`);
    }

    for (let i = 0; i < friends.length; i++) {
      getAllFriendsDto.push({
        userId: friends[i].friendsId.id,
        nickname: friends[i].friendsId.nickname,
        state: friends[i].friendsId.state,
      });

      return getAllFriendsDto;
    }
  }
}
