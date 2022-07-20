import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { join } from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configServer = app.get(ConfigService);
  const port = configServer.get("NODE_SERVER_PORT");
  app.enableCors();
  app.useStaticAssets(join(__dirname, "..", "img"));
  await app.listen(port);
}
bootstrap();
