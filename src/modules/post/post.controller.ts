import { Controller, Get, Post as _Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PostService } from './post.services';
import { Post } from './post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Post> {
    return this.postService.findOne(id);
  }

  @Get('/author/:id')
  findByAuthor(@Param('id') id: number): Promise<Post[]> {
    return this.postService.findByAuthor(id);
  }

  @Get('/category/:id')
  findByCategory(@Param('id') id: number): Promise<Post[]> {
    return this.postService.findByCategory(id);
  }

  @Get('/tag/:id')
  findByTag(@Param('id') id: number): Promise<Post[]> {
    return this.postService.findByTag(id);
  }

  @Get('/:id/related')
  findRelated(@Param('id') id: number): Promise<Post[]> {
    return this.postService.findRelated(id);
  }

  @_Post()
  create(@Body() post: Post): Promise<Post> {
    return this.postService.create(post);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() post: Post): Promise<void> {
    return this.postService.update(+id, post);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.postService.delete(+id);
  }
}