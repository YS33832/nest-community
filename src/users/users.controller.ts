import {Body, Controller, Get, Post, Req, UseGuards, Res} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/createUser.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Response, Request} from "express";
import {STATIC_URL} from "../common/constants";

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @Post('valid')
    async userValid(@Body() body): Promise<string>{
        const { type, data} : { type: string , data: string} = body
        return await this.userService.userValidate(body.type, body.data);
    }

    @Post('join')
    async createUser(@Body() userData: CreateUserDto, @Res() res: Response){

        const result =  await this.userService.createUser(userData);;
        if(result) {
            res.redirect(STATIC_URL);
        }else{;
            res.send("<script>alert(\"회원가입 처리중 오류가 발생했습니다.\"); location.href = document.referrer;</script>");
        }
    }

    @Post('logout')
    async logOut(@Req() req: Request, @Res() res: Response){
        res.setHeader(
            'Set-cookie',
            this.userService.getCookieForLogOut(),
        )
        return res.sendStatus(200);
    }

}
