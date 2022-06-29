import { User } from "src/user/user.entity";

export class GetAllFriendsDto {
  id: number;
  ownId: User;
  friendsId: User;
}
