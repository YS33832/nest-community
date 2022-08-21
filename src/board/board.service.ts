import {HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Board} from "../entities/board.entity";
import {Repository} from "typeorm";
import {CreateBoardDto} from "./dto/create-board.dto";

@Injectable()
export class BoardService {
    constructor(@InjectRepository(Board) private boardRepository: Repository<Board>) {}

    async findOne(title){
       return await this.boardRepository.findOneBy({title});
    }

    async createBoard(data: CreateBoardDto){
        const {admin_id, admin_pw, ...board} = data;
        const result = await this.findOne(board.title);
        if(result) throw new HttpException("같은 이름의 게시판이 존재합니다,", 400);
        const boardEntity = this.boardRepository.create(board);
        await this.boardRepository.save(boardEntity);
    }

}
