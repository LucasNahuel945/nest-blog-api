import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async findOne(id: number): Promise<Comment> {
    return await this.commentRepository.findOneBy({ comment_id: id })
  }

  async create(comment: Comment): Promise<Comment> {
    return await this.commentRepository.save(comment);
  }

  async update(id: number, comment: Comment): Promise<void> {
    await this.commentRepository.update(id, comment);
  }

  async delete(id: number): Promise<void> {
    await this.commentRepository.delete(id);
  }
}