import { Injectable, UnauthorizedException} from '@nestjs/common';
import {User} from "../entities/user.entity";
import * as bcrypt from 'bcrypt';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
@Injectable()
export class AuthService {
    constructor(private readonly userService  : UsersService, private jwtService: JwtService) {}

    async validateUser(id, password) : Promise<User>{ // 유저 로그인 검증
        try{
            const user = await this.userService.findOne(id) // 유저 정보 가져오기

            if(!user) throw new Error('error'); //

            let result = await bcrypt.compare(password, user.user_password);
            if(result){
                delete user.user_password;
                return user;
            }
            else{
                throw new Error('error');
            }

        }catch(error){
            throw new UnauthorizedException('아이디와 패스워드를 확인해주세요.');
        }
    }

    async login(user: any){
        const payload = { username : user.user_name, sub: user.user_id}
        return{
            access_token : this.jwtService.sign(payload),
        }
    }


}
