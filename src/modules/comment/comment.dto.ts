import { IsString, IsDate, IsInt } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
    @IsString()
    content: string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    comment_date: Date;

    @IsInt()
    author_id: number;

    @IsInt()
    post_id: number;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) { }