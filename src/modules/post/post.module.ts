import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.services';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [PostController],
    providers: [JwtService, PostService],
    exports:[PostService]
})

export class PostModule {}