import { Length } from 'class-validator';

export class CategoryDto {
    @Length(1, 64)
    name: string;
}
