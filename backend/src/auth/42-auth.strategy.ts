import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile, VerifyCallBack } from "passport-42";
import { ConfigService } from "@nestjs/config";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class FtStrategy extends PassportStrategy(Strategy, "42") {
  constructor(private readonly configService: ConfigService) {
    super({
      authorizationURL:
        "https://api.intra.42.fr/oauth/authorize?client_id=68cb3c8862c43682bc3c0d7624d1654a742d7ccf51750d254fc2c40e19434fcc&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flogin&response_type=code",
      tokenURL: "https://api.intra.42.fr/oauth/token",
      clientID:
        "68cb3c8862c43682bc3c0d7624d1654a742d7ccf51750d254fc2c40e19434fcc",
      clientSecret:
        "f0ba627754f81ff87766dcc79e008b1836f039ae754ae189cb857f5e45457018",
      callbackURL: "http://localhost:3000/auth/login",
      // authorizationURL: `https://api.intra.42.fr/oauth/authorize?client_id=${configService.get<string>(
      //   "CLIENT_ID",
      // )}&redirect_uri=${configService.get<string>(
      //   "REDIRECT_URI",
      // )}&response_type=code`,
      // tokenURL: configService.get<string>("TOKEN_URI"),
      // clientID: configService.get<string>("CLIENT_ID"),
      // clientSecret: configService.get<string>("CLIENT_SECRET"),
      // callbackURL: configService.get<string>("CB_URI"),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: VerifyCallBack,
  ): Promise<any> {
    const { id, username, emails } = profile;
    const user: UserDto = {
      apiId: +id,
      nickname: username,
      email: emails[0].value,
    };
    return cb(null, user);
  }
}
