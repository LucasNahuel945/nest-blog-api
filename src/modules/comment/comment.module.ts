import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.services';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    controllers: [CommentController],
    providers: [CommentService, JwtService],
    exports: [CommentService]
})

export class CommentModule {}