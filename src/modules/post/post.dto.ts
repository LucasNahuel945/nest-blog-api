import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsDate,
    IsInt
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsDate()
    @Transform(({ value }) => new Date(value))
    publish_date: Date;

    @IsInt()
    author_id: number;

    @IsOptional()
    category_ids?: number[];

    @IsOptional()
    tag_ids?: number[];
}


export class RelatedPostDto {
    @IsNotEmpty()
    post_id: number;
}

export class RelatedPostsDto {
    @IsNotEmpty()
    related_posts: RelatedPostDto[];
}

export class UpdatePostDto extends PartialType(CreatePostDto) { }