import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../post';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  tag_id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ManyToMany(() => Post, post => post.tags)
  posts: Post[];
}