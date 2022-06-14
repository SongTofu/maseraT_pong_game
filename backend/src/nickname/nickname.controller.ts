import { Controller, Get, Param } from "@nestjs/common";
import { NicknameService } from "./nickname.service";

@Controller("nickname")
export class NicknameController {
  constructor(private nicknameService: NicknameService) {}

  @Get("/:nickname")
  isExistNickname(@Param("nickname") nickname: string): Promise<Boolean> {
    console.log("nick", nickname);
    return this.nicknameService.isExistNickname(nickname);
  }
}
