import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SecondAuthModule } from "./second-auth/second-auth.module";
import { RecordModule } from "./record/record.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NicknameModule } from "./nickname/nickname.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { AuthModule } from "./auth/auth.module";
import { ChatModule } from "./chat/chat.module";
import { AchievementModule } from "./achievement/achievement.module";
import { UserModule } from "./user/user.module";
import { FriendModule } from "./friend/friend.module";
import { BlockModule } from "./block/block.module";
import { GameModule } from "./game/game.module";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      ignoreEnvFile: process.env.NODE_ENV === "prod",
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("dev", "prod").required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== "prod",
      // logging: process.env.NODE_ENV !== "prod",
      entities: [
        __dirname + "/../**/*.entity.{js, ts}",
        __dirname + "/../**/entity/*.entity.{js, ts}",
        // User,
        // SecondAuthCode,
        // Record,
        // GameParticipant,
        // GameRoom,
        // Friend,
        // ChatParticipants,
        // ChatRoom,
        // Block,
        // Achievement,
      ], // Entity 그대로 넣으면 빠른데 dir로 주면 느려짐 ㄱㅊ?
    }),
    UserModule,
    SecondAuthModule,
    RecordModule,
    NicknameModule,
    MailerModule.forRoot({
      transport: `smtps://${process.env.EMAIL_AUTH_EMAIL}:${process.env.EMAIL_AUTH_PASSWORD}@${process.env.EMAIL_HOST}`,
      defaults: {
        from: `${process.env.EMAIL_FROM_USER_NAME} <modules@nestjs.com>`,
      },
      // transport:
      //   "smtps://a01083167716@gmail.com:rqzulibmccndnalz@smtp.gmail.com",
      // defaults: {
      //   from: "'nest-modules' <modules@nestjs.com>",
      //정상 작동하는지 확인 필요
    }),
    AuthModule,
    ChatModule,
    AchievementModule,
    FriendModule,
    BlockModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
