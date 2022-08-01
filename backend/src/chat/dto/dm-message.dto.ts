import { User } from "src/user/user.entity";

export class DMMessageDto {
  constructor(sender: User, message: string) {
    sender;
    message;
  }
  sender: string;
  message: string;
}
