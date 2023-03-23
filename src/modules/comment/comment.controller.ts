import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CommentService } from './comment.services';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(+id);
  }

  @Post()
  create(@Body() comment: Comment): Promise<Comment> {
    return this.commentService.create(comment);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() comment: Comment): Promise<void> {
    return this.commentService.update(+id, comment);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.commentService.delete(+id);
  }
}