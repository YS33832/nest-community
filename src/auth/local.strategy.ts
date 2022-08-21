import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {Strategy } from "passport-local";
import {User} from "../entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: "user_id",
            passwordField: "user_password",
        });
    }

    async validate(user_id: string, user_password: string): Promise<User>{
        const user = await this.authService.validateUser(user_id, user_password); // 유저 검증
        if(!user){
            throw new UnauthorizedException("아이디와 비밀번호를 확인해주세요.");
        }
        return user;
    }
}