import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../post';
import { User } from '../user';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;
  
  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column()  
  created_at: Date;
  
  @ManyToOne(() => User, user => user.comments)
  author: User;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}