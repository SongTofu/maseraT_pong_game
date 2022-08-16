import {
  Controller,
  Get,
  Req,
  UseGuards,
  Post,
  Delete,
  Body,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { GetAllFriendsDto } from "./dto/get-all-friends.dto";
import { FriendService } from "./friend.service";

@Controller("friend")
@UseGuards(JwtAuthGuard)
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Get()
  getAllFriend(@Req() req): Promise<GetAllFriendsDto[]> {
    const id = req.user.id;

    return this.friendService.getAllFriends(id);
  }

  @Post()
  addFriend(
    @Req() req,
    @Body("targetId") targetId: number,
  ): Promise<{ isSuccess: boolean }> {
    return this.friendService.addFriend(req.user.id, targetId);
  }
}
