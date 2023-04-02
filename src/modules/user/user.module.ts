import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category';
import { Post } from '../post';
import { Tag} from '../tag';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserPostService } from './user.post.services';
import { UserService } from './user.services';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category]),
        TypeOrmModule.forFeature([Post]),
        TypeOrmModule.forFeature([Tag]),
        TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        UserService,
        JwtService,
        UserPostService,
    ],
    exports: [UserService, UserPostService],
})

export class UserModule {}