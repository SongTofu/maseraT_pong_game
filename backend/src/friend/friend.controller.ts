import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { GetAllFriendsDto } from "./dto/get-all-friends.dto";
import { FriendService } from "./friend.service";

// needs test
@Controller("friend")
@UseGuards(JwtAuthGuard)
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Get()
  getAllFriend(@Req() req): Promise<GetAllFriendsDto[]> {
    const id = req.user.id;

    return this.friendService.getAllFriends(id);
  }
}
