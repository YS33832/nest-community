import {Controller, Get, Render, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {Response,Request} from "express";
import {MyLogger} from "./logger/logger.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private logger : MyLogger) {}

  @Get('favicon.ico') //favicon.ico 요청시 기본 패비콘 리턴(정상 상황에서는 설정된 패비콘 로드하도록 랜더링)
  async sendFavicon(@Req() req: Request, @Res() res: Response) {
    res.json("test");
  }
  @Get('/*')
  async render(@Req() req: Request, @Res() res: Response) {
    try{
      this.logger.log('host : ' + req.headers.host+' params : /'+req.params[0]);
      await this.appService.siteRender(req, res);
    }catch(error){
      (process.env.NODE_ENV === 'dev')? this.logger.error(`${req.headers.host}에서 에러 발생`): res.render("site/error.ejs");
    }
  }
}
