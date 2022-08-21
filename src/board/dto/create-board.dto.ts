import {IsNumber, IsOptional, IsString, Max, Min} from "class-validator";

export class CreateBoardDto{
    @IsString()
    admin_id: string
    @IsString()
    admin_pw: string

    @IsString()
    title : string

    @IsOptional()
    @IsNumber()
    @Min(0, {message: "0또는 1만 입력 해주세요."})
    @Max(1, { message : "0 또는 1만 입력 해주세요."})
    anonymous: number | null

    @IsOptional()
    @IsString()
    category: string | null

    @IsOptional()
    @IsString()
    skin_path: string | null

}