import {Body, Controller, Post} from '@nestjs/common';
import {LoginUserDto} from "./dto/loginUser.dto";
import {AuthService} from "./auth.service";
import {User} from "../entities/user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }
    @Post('login')
    async login(@Body() body: LoginUserDto): Promise<User>{

        return await this.authService.login(body);
    }
}
