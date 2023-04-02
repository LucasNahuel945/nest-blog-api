import { IsString, IsDate, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';

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