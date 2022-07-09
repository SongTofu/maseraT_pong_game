import { User } from "../user.entity";

export class UserListDto {
  constructor(user: User) {
    this.userId = user.id;
    this.nickname = user.nickname;
    this.state = user.state;
    this.socketId = user.socketId;
  }
  userId: number;
  nickname: string;
  state: number;
  socketId: string;
}
