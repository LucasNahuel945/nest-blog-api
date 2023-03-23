import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm'
import { Category } from '../category'
import { User } from '../user'
import { Tag } from '../tag'
import { Comment } from '../comment'

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  publish_date: Date;

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