import { Injectable, NotFoundException } from "@nestjs/common";
import { GetAllFriendsDto } from "./dto/get-all-friends.dto";
import { Friend } from "./friend.entity";
import { FriendsRepository } from "./friend.repository";

@Injectable()
export class FriendService {
  constructor(private friendsRository: FriendsRepository) {}

  async getAllFriends(id): Promise<GetAllFriendsDto[]> {
    const getAllFriendsDto: GetAllFriendsDto[] = [];
    const friends: Friend[] = await this.friendsRository.find({
      where: {
        ownId: id,
      },
      relations: ["friendId"],
    });

    if (!friends) {
      throw new NotFoundException(`Nobody friends exist`);
    }

    friends.forEach((friend) => {
      getAllFriendsDto.push(new GetAllFriendsDto(friend.friendId));
    });

    return getAllFriendsDto;
  }
}
