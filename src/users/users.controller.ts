import {Body, Controller, Get, Post, Req, UseGuards, Res} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/createUser.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Response, Request} from "express";

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
    async createUser(@Body() userData: CreateUserDto){
        return await this.userService.createUser(userData);;
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
