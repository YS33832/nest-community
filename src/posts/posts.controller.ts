import {Body, Controller, Post, Req, UnauthorizedException} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {Request} from "express";
import {CreatePostDto} from "./dto/create-post.dto";

@Controller('post')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Post("create")
    async createPost(@Req() req: Request, @Body() body: CreatePostDto){
        if(!req.user) throw new UnauthorizedException("로그인후 작성해주세요,");

        return await this.postService.createPost(req.user, body);

    }

}
