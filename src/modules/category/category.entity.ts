import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../post';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ManyToMany(() => Post, post => post.categories)
  posts: Post[];
}
