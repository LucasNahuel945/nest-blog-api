import { forwardRef, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.services';
import { CategoryService } from '../category/category.services';
import { TagService } from '../tag/tag.services';
import { UserService } from '../user/user.services';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [PostController],
    providers: [
        JwtService,
        PostService,
        //CategoryService,
        //TagService,
        //UserService,
    ],
    exports:[PostService]
})

export class PostModule {}