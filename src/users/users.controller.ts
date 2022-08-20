import {Body, Controller, Post, Req} from '@nestjs/common';
import {Request} from "express";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/createUser.dto";

@Controller('user')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }
    @Post('join')
    async createUser(@Body() userData: CreateUserDto){
        const user = await this.userService.createUser(userData);
        return user;

    }
}
