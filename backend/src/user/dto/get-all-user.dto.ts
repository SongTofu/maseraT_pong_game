import { User } from "../user.entity";

export class GetAllUserDto {
  constructor(user: User) {
    this.userId = user.id;
    this.nickname = user.nickname;
    this.state = user.state;
  }
  userId: number;
  nickname: string;
  state: number;
}
