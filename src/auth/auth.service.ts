import { Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginUserDto} from "./dto/loginUser.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User> ) {
    }

    async login(loginData : LoginUserDto) : Promise<User>{
        try{
            const { user_id, user_password } = loginData
            const user = await this.userRepository.findOneBy({user_id})
            if(!user) throw new Error('error');
            let result = await bcrypt.compare(user_password, user.user_password);
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
}
