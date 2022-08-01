import { User } from "src/user/user.entity";

export class DMMessageDto {
  constructor(sender: string, message: string) {
    this.nickname = sender;
    this.message = message;
  }
  nickname: string;
  message: string;
}
