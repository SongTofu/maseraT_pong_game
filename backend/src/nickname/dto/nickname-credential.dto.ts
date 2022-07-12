import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class NicknameCredentialsDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @Matches(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/)
  nickname: string;
}
