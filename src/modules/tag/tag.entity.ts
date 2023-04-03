import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Post } from '../post';

@Entity('tags')
export class Tag {
  @PrimaryColumn()
  tag_id: string = uuidv4();

  @ApiProperty()
  @Column()
  name: string;

  @ManyToMany(() => Post, post => post.tags)
  posts: Post[];
}