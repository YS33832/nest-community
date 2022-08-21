import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post} from "../entities/post.entity";
import {UsersService} from "../users/users.service";
import {BoardService} from "../board/board.service";

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Post) private postRepository: Repository<Post>, private readonly userService: UsersService, private readonly boardService: BoardService) {}


    async createPost(user, post){
        try{

            const userEntity = await this.userService.findOne(user.user_id);
            const boardEntity = await this.boardService.findOne(post.board_title);
            post.user = userEntity;
            post.board = boardEntity;
            const postEntity =  this.postRepository.create(post);
            await this.postRepository.save(postEntity);
            return true;
        }catch(error){
            throw new HttpException("생성 오류!!", 400);
        }
    }
}
