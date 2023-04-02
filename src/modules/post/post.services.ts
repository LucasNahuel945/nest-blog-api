import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  relations: string[];

  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {
    this.relations = ['author', 'categories', 'tags', 'related_posts', 'comments']
  }

  async findAll(
    page: number = 1,
    limit: number = 10): Promise<Post[]> {
    return this.postRepository.find({
      relations: this.relations,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: { post_id: id },
      relations: this.relations,
    });
  }

  async findByAuthor(
    id: string, 
    page: number = 1,
    limit: number = 10
  ): Promise<Post[]> {
    return this.postRepository.find({
      where: { author: { user_id: id } },
      relations: this.relations,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findByCategory(
    id: number, 
    page: number = 1,
    limit: number = 10
  ): Promise<Post[]> {
    const posts = await this
      .postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.categories', 'category')
      .where(
        'category.category_id = :id', {
          id,
          skip: (page - 1) * limit,
          take: limit,
        })
      .getMany();

    return posts;
  }

  async findByTag(
    id: number, 
    page: number = 1,
    limit: number = 10
  ): Promise<Post[]> {
    const posts = await this
      .postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .where('tag.tag_id = :id', {
        id,
        skip: (page - 1) * limit,
        take: limit,
      })
      .getMany();

    return posts;
  }

  async findRelated(
    id: number, 
    page: number = 1,
    limit: number = 10
  ): Promise<Post[]> {
    const posts = await this
      .postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.related_posts', 'related_post')
      .where('related_post.post_id = :id', {
        id,
        skip: (page - 1) * limit,
        take: limit,
      })
      .getMany();
    
    return posts;
  }

  async delete(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}