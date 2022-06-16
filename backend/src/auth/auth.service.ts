import { Injectable } from "@nestjs/common";
import passport from "passport";
import env from "../auth.env";

app.get('/auth/42',
  passport.authenticate('42'));

app.get('/auth/42/callback',
  passport.authenticate('42', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

@Injectable()
export class AuthService {
  app.get('/auth/42',
    passport.authenticate('42'));

  app.get('/auth/42/callback',
    passport.authenticate('42', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
  });
  // asnc getToken(): Promise<string>
  // {
  //   const FortyTwoStrategy = require("passport-42").Strategy;

  //   passport.use(
  //     new FortyTwoStrategy(
  //       {
  //         clientID: env.UID,
  //         clientSecret: env.SECRET,
  //         callbackURL: "http://127.0.0.1:3000/auth/42/callback",
  //       },
  //       function (accessToken, refreshToken, profile, cb) {
  //         User.findOrCreate({ fortytwoId: profile.id }, function (err, user) {
  //           return cb(err, user);
  //         });
  //       },
  //     ),
  //   );
  // }

  // async logIn(token): Promise<void> {}
}
