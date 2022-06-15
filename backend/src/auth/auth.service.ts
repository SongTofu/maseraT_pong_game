import { Injectable } from "@nestjs/common";
import passport from "passport";

@Injectable()
export class AuthService {
  async logIn(): Promise<void> {
    const FortyTwoStrategy = require("passport-42").Strategy;

    passport.use(new FortyTwoStrategy({}));
  }
}
