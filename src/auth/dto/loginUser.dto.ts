import { IsString, MaxLength, MinLength} from "class-validator";

export class LoginUserDto{
    @IsString({message: "문자열 형태로만 전송해주세요."})
    @MinLength(2, {message: "유저 아이디는 2글자 이상 입력해주세요"})
    @MaxLength(20, {message: "유저 아이디는 20글자 이하로 입력해주세요"})
    user_id : string

    @IsString( {message: "문자열 형태로만 전송해주세요."})
    user_password: string

}