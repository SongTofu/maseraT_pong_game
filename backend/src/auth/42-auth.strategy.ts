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
        "https://api.intra.42.fr/oauth/authorize?client_id=7a58c54c1df5e327cca044b8ecd5fab94f69e7e5d01eca043443149bc22e2583&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flogin&response_type=code",
      tokenURL: "https://api.intra.42.fr/oauth/token",
      clientID:
        "7a58c54c1df5e327cca044b8ecd5fab94f69e7e5d01eca043443149bc22e2583",
      clientSecret:
        "c77224331b739acbd0d91de786a82e6e781988a84788818c7afe433d39ba6f7d",
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
