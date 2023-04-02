import { Length } from 'class-validator';

export class TagDto {
    @Length(1, 32)
    name: string;
}
