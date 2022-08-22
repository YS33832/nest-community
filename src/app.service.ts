import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  siteRender(req){
    console.log(req.header('user-agent'));
    console.log(req.params);
  }
}
