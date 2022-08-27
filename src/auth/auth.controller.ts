import {Request, Controller, Post, UseGuards, Res, Get} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {Response} from "express";
import {STATIC_URL} from "../common/constants";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res() res: Response) {
        try{
            const token = await this.authService.login(req.user); // jwt 생성
            res.cookie('user', token?.access_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) // jwt 쿠키 설정
            res.redirect(STATIC_URL);
        }catch(err){
            res.send(`<script>alert('${err.message}'); location.href = '${STATIC_URL}'</script>`);
        }
    }
}
