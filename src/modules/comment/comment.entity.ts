import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Post } from '../post';
import { User } from '../user';

@Entity('comments')
export class Comment {
  @PrimaryColumn()
  comment_id: string = uuidv4();
  
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