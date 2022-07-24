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
        // "https://api.intra.42.fr/oauth/authorize?client_id=eadc827a2c608cba87dae29e1dfd64b9096356155d6264e8448655c4e828099e&redirect_uri=http%3A%2F%2F112.154.12.4%3A3000%2Fauth%2Flogin&response_type=code",
        "https://api.intra.42.fr/oauth/authorize?client_id=eadc827a2c608cba87dae29e1dfd64b9096356155d6264e8448655c4e828099e&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flogin&response_type=code",
      tokenURL: "https://api.intra.42.fr/oauth/token",
      clientID:
        "eadc827a2c608cba87dae29e1dfd64b9096356155d6264e8448655c4e828099e",
      clientSecret:
        "dc9102b91ed1b3791b09c7615847f01265365f88f5d76a6528637e19d767e5e7",
      // callbackURL: "http://112.154.12.4:3000/auth/login",
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
