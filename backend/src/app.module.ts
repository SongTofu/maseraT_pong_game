import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SecondAuthModule } from "./second-auth/second-auth.module";
import { RecordModule } from "./record/record.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./configs/typeorm.configs";
import { NicknameModule } from "./nickname/nickname.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { AuthModule } from "./auth/auth.module";
import { ChatModule } from "./chat/chat.module";
import { AchievementModule } from "./achievement/achievement.module";
import { UserInfoModule } from "./user/user.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { FriendModule } from './friend/friend.module';
import { BlockModule } from './block/block.module';

@Module({
  imports: [
    UserInfoModule,
    SecondAuthModule,
    RecordModule,
    TypeOrmModule.forRoot(typeORMConfig),
    NicknameModule,
    MailerModule.forRoot({
      transport:
        "smtps://a01083167716@gmail.com:rqzulibmccndnalz@smtp.gmail.com",
      defaults: {
        from: "'nest-modules' <modules@nestjs.com>",
      },
    }),
    AuthModule,
    ChatModule,
    AchievementModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "img"),
    }),
    FriendModule,
    BlockModule,
  ],
  controllers: [AppController],
  providers: [AppService], //, AchievementService
})
export class AppModule {}
