import { Controller, Get, Delete, Param, Query, NotFoundException } from '@nestjs/common';
import { PostService } from './post.services';
import { Post } from './post.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AllowRoles, OnlyEditors, OnlyOwner } from 'src/access-control';
import { UserRole } from 'src/access-control/roles.enum';

@ApiBearerAuth()
@ApiTags("Posts Endpoints")
@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<Post[]> {
    return this.postService.findAll(page, limit);
  }

  @Get(':post_id')
  findOne(@Param('post_id') postId: number): Promise<Post> {
    return this.postService.findOne(postId);
  }

  @Get('/author/:author_id')
  findByAuthor(
    @Param('author_id') authorId: string,  
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<Post[]> {
    return this.postService.findByAuthor(authorId, page, limit);
  }

  @Get('/category/:category_id')
  findByCategory(
    @Param('category_id') categoryId: number,  
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<Post[]> {
    return this.postService.findByCategory(categoryId, page, limit);
  }

  @Get('/tag/:tag_id')
  findByTag(
    @Param('tag_id') tagId: number,  
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<Post[]> {
    return this.postService.findByTag(tagId, page, limit);
  }

  @Get('/:post_id/related')
  findRelated(
    @Param('post_id') postId: number,  
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ): Promise<Post[]> {
    return this.postService.findRelated(postId, page, limit);
  }

  @Delete(':post_id')
  @AllowRoles(UserRole.EDITOR, UserRole.ADMIN)
  delete(@Param('post_id') postId: string): Promise<void> {
    return this.postService.delete(+postId);
  }

}