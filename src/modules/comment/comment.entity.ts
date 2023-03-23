import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm"
import { Post } from '../post'
import { User } from '../user'

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  content: string;

  @Column()
  comment_date: Date;

  @ManyToOne(() => User, user => user.comments)
  author: User;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}