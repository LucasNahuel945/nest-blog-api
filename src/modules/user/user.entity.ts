import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../post';
import { Comment } from '../comment';
import { UserRole } from 'src/access-control/roles.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;
  
  @ApiProperty()
  @Column()
  username: string;
  
  @ApiProperty()
  @Column()
  firstname: string;
  
  @ApiProperty()
  @Column()
  lastname: string;

  @ApiProperty()
  @Column()
  email: string;
  
  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.READER })  
  role: UserRole;

  @ApiProperty()
  @Column()  
  created_at: Date;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
  
  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];

}
