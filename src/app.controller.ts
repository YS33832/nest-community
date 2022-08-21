import {Controller, Get, Render, Req} from '@nestjs/common';
import { AppService } from './app.service';
import {Request} from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("test")
  test(@Req() req: Request){
    return req.user;
  }
  @Get()
  @Render('site/skin/index')
  getHello(@Req() req: Request) {
    return req.user;
  }
}
