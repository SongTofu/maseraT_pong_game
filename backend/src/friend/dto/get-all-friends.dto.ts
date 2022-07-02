import { User } from "src/user/user.entity";

export class GetAllFriendsDto {
  userID: number;
  nickname: string;
  state: number;
}
