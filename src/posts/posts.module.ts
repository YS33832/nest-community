import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Post} from "../entities/post.entity";
import {UsersModule} from "../users/users.module";
import {UsersService} from "../users/users.service";
import {BoardModule} from "../board/board.module";
import {BoardService} from "../board/board.service";

@Module({
  imports:[TypeOrmModule.forFeature([Post]), UsersModule, BoardModule],
  controllers: [PostsController],
  providers: [PostsService, TypeOrmModule, UsersService]
})
export class PostsModule {}
