import { Injectable, NotFoundException } from "@nestjs/common";
import { GetAllFriendsDto } from "./dto/get-all-friends.dto";
import { Friend } from "./friends.entity";
import { FriendsRepository } from "./friends.repository";

@Injectable()
export class FriendService {
  constructor(private friendsRository: FriendsRepository) {}

  async getAllFriends(id): Promise<GetAllFriendsDto[]> {
    const getAllFriendsDto: GetAllFriendsDto[] = [];
    const friends: Friend[] = await this.friendsRository.find(id);

    if (!friends) {
      throw new NotFoundException(`Nobody friends exist`);
    }

    friends.forEach((friend) => {
      getAllFriendsDto.push(new GetAllFriendsDto(friend.friendsId));
    });

    return getAllFriendsDto;
  }
}
