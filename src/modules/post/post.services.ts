import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  relations: string[];

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {
    this.relations = ['author', 'categories', 'tags', 'related_posts', 'comments']
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: this.relations,
    });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: { post_id: id },
      relations: this.relations,
    });
  }

  async findByAuthor(id: number): Promise<Post[]> {
    return this.postRepository.find({
      where: { author: { user_id: id } },
      relations: this.relations,
    });
  }

  async findByCategory(id: number): Promise<Post[]> {
    const posts = await this
      .postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.categories', 'category')
      .where('category.category_id = :id', { id })
      .getMany();

    return posts;
  }

  async findByTag(id: number): Promise<Post[]> {
    const posts = await this
      .postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .where('tag.tag_id = :id', { id })
      .getMany();

    return posts;
  }

  async findRelated(id: number): Promise<Post[]> {
    const posts = await this
      .postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.related_posts', 'related_post')
      .where('related_post.post_id = :id', { id })
      .getMany();
    
    return posts;
  }

  async create(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  async update(id: number, post: Post): Promise<void> {
    await this.postRepository.update(id, post);
  }

  async delete(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}