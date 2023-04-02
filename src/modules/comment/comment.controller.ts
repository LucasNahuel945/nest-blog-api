import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.services';
import { Comment } from './comment.entity';
import { OnlyRegistered, OnlyAdmins } from 'src/access-control';

@ApiTags("Post's comments Endpoints")
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @OnlyAdmins()
  @Get()
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @OnlyAdmins()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(+id);
  }

  @OnlyAdmins()
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.commentService.delete(+id);
  }

  @OnlyRegistered()
  @Post()
  create(@Body() comment: Comment): Promise<Comment> {
    return this.commentService.create(comment);
  }
}