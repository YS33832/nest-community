import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "./Pipes/validation.pipe";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import {userDataFromJwt} from "./middlewares/jwt.middleware";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser()); // 쿠키 사용
  app.use(userDataFromJwt);
  app.useGlobalGuards(new JwtAuthGuard());
  app.useGlobalPipes(new ValidationPipe()); // class-validator 검증 DTO
  app.useStaticAssets("public")
  app.setViewEngine('ejs')
  await app.listen(process.env.PORT); //  포트 사용
}
bootstrap();
