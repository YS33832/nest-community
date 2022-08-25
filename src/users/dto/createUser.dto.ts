import {IsEmail, IsString, MaxLength, Min, MinLength} from "class-validator";

export class CreateUserDto {
    @IsString({message: "문자열 형태로만 전송해주세요."})
    @MinLength(3, {message: "유저 아이디는 3글자 이상 입력해주세요"})
    @MaxLength(8, {message: "유저 아이디는 8글자 이하로 입력해주세요"})
    user_id : string

    @IsString( {message: "문자열 형태로만 전송해주세요."})
    user_password: string

    @IsString( {message: "문자열 형태로만 전송해주세요."})
    user_name: string

    @IsEmail({},{ message: "이메일 형태로만 전송해주세요." } )
    user_email: string
}