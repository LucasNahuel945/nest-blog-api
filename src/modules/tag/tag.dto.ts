import { Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTagDto {
    @Length(1, 32)
    name: string;
}

export class UpdateTagDto extends PartialType(CreateTagDto) { }