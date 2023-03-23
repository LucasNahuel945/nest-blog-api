import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.services';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Post()
  create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() category: Category): Promise<void> {
    return this.categoryService.update(+id, category);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(+id);
  }
}