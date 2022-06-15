import { Controller, Get, Param, ValidationPipe } from "@nestjs/common";
import { NicknameService } from "./nickname.service";
import { NicknameCredentialsDto } from "./dto/nickname-credential.dto";

@Controller("nickname")
export class NicknameController {
  constructor(private nicknameService: NicknameService) {}

  @Get("/:nickname")
  isExistNickname(
    @Param(ValidationPipe) nicknameCredentialsDto: NicknameCredentialsDto,
  ): Promise<{ isExistNickname: boolean }> {
    return this.nicknameService.isExistNickname(nicknameCredentialsDto);
  }
}
