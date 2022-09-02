import {HttpException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post} from "../entities/post.entity";
import {UsersService} from "../users/users.service";
import {BoardService} from "../board/board.service";
import {Comment} from "../entities/comment.entity";
import {Board} from "../entities/board.entity";

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
        private readonly userService: UsersService, private readonly boardService: BoardService
    ) {}

    /**
    * @param id 게시글 id
    */
    async findOnePost(id): Promise<Post>{ // id 를통해 게시글 1개 가져오기
        const post =  await this.postRepository.findOne({
            where:{
                id
            },
            relations:{
                user: true,
                board: true,
            }
        })
        delete post.user.user_password
        return post;
    }

    async createPost(user, post){
        try{
            const userEntity = await this.userService.findOne(user.user_id); // User 엔티티 가져오기
            const boardEntity = await this.boardService.findOne(post.board_table); // Board 엔티티 가져오기

            // User, Board 엔티티를 통해 joinColumn 생성
            post.user = userEntity;
            post.board = boardEntity;
            const postEntity =  this.postRepository.create(post);
            await this.postRepository.save(postEntity);

            return true;
        }catch(error){
            throw new HttpException("생성 오류!!", 400);
        }
    }

    async createComment(user, comment){
        try {
            const userEntity = await this.userService.findOne(user.user_id); // User 엔티티 가져오기
            const postEntity = await this.findOnePost(comment.post_id); // Post 엔티티 가져오기
            comment.user = userEntity;
            comment.post = postEntity;
            const commentEntity = this.commentRepository.create(comment);

            return  await this.commentRepository.save(commentEntity);
        }catch(error){
            throw new HttpException("생성 오류!!", 400);
        }
    }

}
