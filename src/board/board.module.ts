import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Board} from "../entities/board.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService, TypeOrmModule],
  exports: [BoardService]
})
export class BoardModule {}
