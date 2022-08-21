import {IsString, MaxLength} from "class-validator";

export class CreatePostDto{
    @IsString()
    @MaxLength(150)
    subject: string

    @IsString()
    content: string


    @IsString()
    board_title: string
}