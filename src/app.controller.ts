import {Controller, Get, Render, Req} from '@nestjs/common';
import { AppService } from './app.service';
import {Request} from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('*')
  @Render('site/index.ejs')
  getHello(@Req() req: Request) {
    return req.user;
  }
}
