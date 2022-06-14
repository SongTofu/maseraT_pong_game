import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class NicknameCredentialsDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  nickname: string;
}
