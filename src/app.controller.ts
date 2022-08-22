import {Controller, Get, Render, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {Response,Request} from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('favicon.ico') //favicon.ico 요청시 기본 패비콘 리턴(정상 상황에서는 설정된 패비콘 로드하도록 랜더링)
  async sendFavicon(@Req() req: Request, @Res() res: Response) {
    res.json("test");
  }
  @Get('/*')
  render(@Req() req: Request, @Res() res: Response) {
    this.appService.siteRender(req);
    res.render("site/index.ejs", { data : "hello"});
  }
}
