import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Tag } from './tag.entity';
import { TagService } from './tag.services';

@ApiTags("Post's tags Endpoints")
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tag> {
    return this.tagService.findOne(id);
  }

  @Post()
  create(@Body() tag: Tag): Promise<Tag> {
    return this.tagService.create(tag);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() tag: Tag): Promise<void> {
    return this.tagService.update(+id, tag);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.tagService.delete(+id);
  }
}