import {Body, Controller, Get, Param, Post, Req, Res, UnauthorizedException} from '@nestjs/common';
import {PostService} from "./post.service";
import {Request, Response} from "express";
import {CreatePostDto} from "./dto/create-post.dto";
import {STATIC_URL} from "../common/constants";

@Controller('post')
export class PostsController {
    constructor(private readonly postService: PostService) {}

    @Post("create")
    async createPost(@Req() req: Request, @Body() body: CreatePostDto, @Res() res: Response){
        if(!req.user) throw new UnauthorizedException("로그인후 작성해주세요,");

        await this.postService.createPost(req.user, body);
        res.redirect(STATIC_URL+`board/${body.board_table}/list`);
    }

    @Post("comment/write")
    async createComment(@Req() req: Request, @Body() body){
        if(!req.user) throw new UnauthorizedException("로그인후 작성해주세요,");

        return await this.postService.createComment(req.user, body);
    }
    @Get(":id")
    async getPost(@Param() param){
        return await this.postService.findOnePost(param.id);
    }

}
