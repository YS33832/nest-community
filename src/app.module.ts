import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: (process.env.NODE_ENV === 'dev') ? ".development.env" : ".prod.env",
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB,
      synchronize: true,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      logging: true,
    }),
    UsersModule, PostsModule, BoardModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AuthModule]
})
export class AppModule {}
