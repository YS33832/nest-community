import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-jwt";
import {ExtractJwt} from "passport-jwt";
import {jwtConstants} from "../common/constants";
import {Request} from "express";
import {UsersService} from "../users/users.service";
import {User} from "../entities/user.entity";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly userService : UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
            (request: Request)=>{
                return request?.cookies?.user
            }
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: any): Promise<User>{
       return await this.userService.findOne(payload.sub); // 유저아이디 통해 유저 정보 가져오기
    }
}