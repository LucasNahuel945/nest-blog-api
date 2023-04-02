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

  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<Comment[]> {
    return this.commentRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string): Promise<Comment> {
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