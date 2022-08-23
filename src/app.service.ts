import { Injectable } from '@nestjs/common';
import {MyLogger} from "./logger/logger.service";
import {getParamList, isMobile, undefinedToString} from "./common/common";
import {STATIC_URL} from "./common/constants";
import {Request, Response} from "express";
type init_render = {
  source: string
  alert_msg : string
  redirect_url: string
  error_msg: string
  m: string
  m2: string
  m3: string
  IS_MOBILE : boolean
  STATIC_URL : string
  CURRENT_DOMAIN: string
  js_file_list: unknown
  css_file_list: unknown
  js_command_list: []
  user_id: string,
  user_data: string,
}
@Injectable()
export class AppService {
  constructor(private logger : MyLogger) {
  }

  initRender(req): init_render | false {
    try{
      const is_mobile = isMobile(req.header('user-agent'));
      const domain = req.headers.host;
      const param_list = getParamList(req);
      const user_uuid = req.user.id;
      const user_data = req.user;
      return {
        source : is_mobile ? 'm_site/index' : 'site/index',
        alert_msg : '',
        redirect_url: '',
        error_msg: '',
        m: undefinedToString(param_list[0]),
        m2: undefinedToString(param_list[1]),
        m3: undefinedToString(param_list[2]),
        IS_MOBILE : is_mobile,
        STATIC_URL : STATIC_URL,
        CURRENT_DOMAIN: domain,
        js_file_list: new Set(),
        css_file_list: new Set(),
        js_command_list: [], //프론트에서 실행할 js
        user_id: user_uuid,
        user_data,
      }
    }catch(err) {
      return false;
    }

  }


  async siteRender(req: Request, res: Response){
    try{
      const render_data : init_render | false = this.initRender(req);
      if(render_data !== false){
        res.render(render_data.source, {render_data});
      }
    }catch(err){

    }
  }
}
