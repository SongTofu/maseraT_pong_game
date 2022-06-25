import { Controller, Get, Param, ValidationPipe } from "@nestjs/common";
import { NicknameService } from "./nickname.service";
import { NicknameCredentialsDto } from "./dto/nickname-credential.dto";

@Controller("nickname")
export class NicknameController {
  constructor(private nicknameService: NicknameService) {}

  @Get("/:nickname")
  isValidNickname(
    @Param(ValidationPipe) nicknameCredentialsDto: NicknameCredentialsDto,
  ): Promise<{ isValidNickname: boolean }> {
    return this.nicknameService.isValidNickname(nicknameCredentialsDto);
  }
}
