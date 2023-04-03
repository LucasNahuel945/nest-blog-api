import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../category';
import { User } from '../user';
import { Tag } from '../tag';
import { Comment } from '../comment';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  post_id: string = uuidv4();

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  content: string;

  @ApiProperty()
  @Column()
  views: number;

  @ApiProperty()
  @Column()
  cover: string;

  @ApiProperty()
  @Column()
  created_at: Date;

  @ManyToOne(() => User, user => user.posts)
  author: User;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @ManyToMany(() => Post, post => post.related_posts)
  @JoinTable()
  related_posts: Post[];
}