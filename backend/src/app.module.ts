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

@Module({
  imports: [
    SecondAuthModule,
    RecordModule,
    TypeOrmModule.forRoot(typeORMConfig),
    NicknameModule,
    MailerModule.forRoot({
      transport:
        "smtps://a01083167716@gmail.com:rqzulibmccndnalz@smtp.gmail.com",
      defaults: {
        from: "'neest-modules' <modules@nestjs.com>",
      },
    }),
    AuthModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
