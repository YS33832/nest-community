import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/createUser.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    async createUser(userdata){
        const { user_id, user_password, user_name, user_email } : CreateUserDto = userdata;

        const result = await this.userRepository.findOneBy({user_id});
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
        return null;

    }
}
