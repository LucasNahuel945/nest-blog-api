import { Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
    @Length(1, 64)
    name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }