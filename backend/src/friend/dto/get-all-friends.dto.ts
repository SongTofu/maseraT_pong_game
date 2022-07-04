import { User } from "src/user/user.entity";

export class GetAllFriendsDto {
  constructor(user: User) {
    this.userId = user.id;
    this.nickname = user.nickname;
    this.state = user.state;
  }
  userId: number;
  nickname: string;
  state: number;
}
