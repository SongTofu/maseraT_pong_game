import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SecondAuthModule } from "./second-auth/second-auth.module";
import { RecordModule } from "./record/record.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeORMConfig } from "./configs/typeorm.configs";
import { NicknameModule } from "./nickname/nickname.module";
import { LoginModule } from "./login/login.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    SecondAuthModule,
    RecordModule,
    TypeOrmModule.forRoot(typeORMConfig),
    NicknameModule,
    LoginModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
