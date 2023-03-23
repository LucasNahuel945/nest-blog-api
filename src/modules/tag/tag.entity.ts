import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from "typeorm"
import { Post } from '../post'

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  tag_id: number;

  @Column()
  name: string;

  @ManyToMany(() => Post, post => post.tags)
  posts: Post[];
}