import { Controller, Get } from "@nestjs/common";
import { GetAllFriendsDto } from "./dto/get-all-friends.dto";
import { FriendService } from "./friend.service";

// needs test
@Controller("friend")
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Get("/friend")
  getAllFriend(): Promise<GetAllFriendsDto[]> {
    return this.friendService.getAllFriends();
  }
}
