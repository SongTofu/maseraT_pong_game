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
        "https://api.intra.42.fr/oauth/authorize?client_id=" +
        configService.get<string>("CLIENT_ID") +
        "&redirect_uri=" +
        configService.get<string>("CB_URI") +
        "&response_type=code",
      tokenURL: configService.get<string>("TOKEN_URI"),
      clientID: configService.get<string>("CLIENT_ID"),
      clientSecret: configService.get<string>("CLIENT_SECRET"),
      callbackURL: configService.get<string>("CB_URI"),
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
