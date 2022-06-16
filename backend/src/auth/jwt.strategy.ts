import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "src/userinfo/user.repository";

const FortyTwoStrategy = require("passport-42").Strategy;

passport.use(
  new FortyTwoStrategy(
    {
      clientID: UID,
      clientSecret: SECRET,
      callbackURL: CB_URI,
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ fortytwoId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    },
  ),
);

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectRepository(UserRepository)
//     private userRepository: UserRepository,
//   ) {
//     super({
//       secretOrKey: env.SECRET,
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     });
//   }
// }
