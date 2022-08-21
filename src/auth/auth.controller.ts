import {Request, Controller, Post, UseGuards, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {Response} from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res() res: Response) {
        const token = await this.authService.login(req.user);
        res.cookie('user', token?.access_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        return res.json({
            message: "로그인 성공",
        })
    }
}
