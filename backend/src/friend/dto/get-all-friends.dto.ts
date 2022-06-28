import { User } from "src/user/entity/user.entity";

export class GetAllFriendsDto {
  id: number;
  ownId: User;
  friendsId: User;
}
