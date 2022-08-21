import {Body, Controller, Post, Req, UnauthorizedException} from '@nestjs/common';
import {Request} from "express";
import {adminCheck} from "../common/common";
import {BoardService} from "./board.service";
import {CreateBoardDto} from "./dto/create-board.dto";

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {
    }
    @Post("create")
    async createBoard(@Req() req: Request, @Body() body: CreateBoardDto){
        const admin = adminCheck(body.admin_id, body.admin_pw);
        if(!admin) throw new UnauthorizedException("관리자만 생성할수 있습니다.");
        await this.boardService.createBoard(body);
        return "게시판이 생성 되었습니다";
    }
}
