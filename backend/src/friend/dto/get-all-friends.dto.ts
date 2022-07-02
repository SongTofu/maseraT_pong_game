import { User } from "src/user/user.entity";

export class GetAllFriendsDto {
  userId: number;
  nickname: string;
  state: number;
}
