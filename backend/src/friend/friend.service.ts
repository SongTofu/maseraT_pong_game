import { Injectable, NotFoundException } from "@nestjs/common";
import { GetAllFriendsDto } from "./dto/get-all-friends.dto";
import { Friend } from "./friend.entity";
import { FriendRepository } from "./friend.repository";
import { UserRepository } from "src/user/user.repository";
import { User } from "src/user/user.entity";
import { UserGateway } from "src/user/user.gateway";

@Injectable()
export class FriendService {
  constructor(
    private friendRepository: FriendRepository,
    private userRepository: UserRepository,
    private userGateway: UserGateway,
  ) {}

  async getAllFriends(id): Promise<GetAllFriendsDto[]> {
    const getAllFriendsDto: GetAllFriendsDto[] = [];
    const friends: Friend[] = await this.friendRepository.find({
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

  async addFriend(
    id: number,
    targetId: number,
  ): Promise<{ isSuccess: boolean }> {
    const user: User = await this.userRepository.findOne(id);
    const target: User = await this.userRepository.findOne(targetId);
    const friend = this.friendRepository.create({
      ownId: user,
      friendId: target,
    });

    await friend.save();

    this.userGateway.friendAll(user.socketId, id);
    return { isSuccess: true };
  }
}
