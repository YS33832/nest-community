import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "./Pipes/validation.pipe";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {join} from 'path';
import {MyLogger} from "./logger/logger.service";
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser()); // 쿠키 사용
  app.useStaticAssets(join(__dirname, '..', "public")) // static 경로 public 설정
  app.setBaseViewsDir(join(__dirname, '..', 'views')) // view 경로 views
  app.setViewEngine('ejs') // view엔진 ejs 설정

  app.useLogger(app.get(MyLogger));
  app.useGlobalGuards(new JwtAuthGuard()); // 전역에서 jwt 인증 유효시 Request 객체에 유저 정보 전달
  app.useGlobalPipes(new ValidationPipe()); // class-validator 검증 DTO
  await app.listen(process.env.PORT); //  포트 사용

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
