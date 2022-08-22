import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/createUser.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    /**
    * @param password 패스워드 가져오는 여부
    */
    async findOne(user_id: string, password = false){
        if(password){
            return await this.userRepository.findOneBy({user_id});
        }else{
            const user = await this.userRepository.findOneBy({user_id});
            delete user.user_password
            return user;
        }
    }


    async createUser(userdata){ // 회원가입
        const { user_id, user_password, user_name, user_email } : CreateUserDto = userdata;

        const result = await this.findOne(user_id, true);
        if(!result){
            const hash_password = await bcrypt.hash(user_password, 10)
            const user = this.userRepository.create({
                user_id,
                user_password : hash_password,
                user_email,
                user_name,
                user_level : 2,
            });
            await this.userRepository.save(user);

            return {
                user_id,
                user_name,
                user_email,
            };
        }
        throw new HttpException("같은 아이디에 유저가 존재합니다.", 400);
    }

    public getCookieForLogOut() { //로그아웃시 쿠키 삭제
        return `user=; HttpOnly; Path=/; Max-Age=0`;
    }
}
