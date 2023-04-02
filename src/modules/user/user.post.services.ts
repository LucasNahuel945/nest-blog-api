import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto';
import { UserService } from '../user/user.services';
import { Category } from '../category';
import { Tag } from '../tag';

@Injectable()
export class UserPostService {
  relations: string[];

  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    private readonly userService: UserService,
  ) {
    this.relations = ['author', 'categories', 'tags', 'related_posts', 'comments']
  }

  private async getTag(tag_id: string): Promise<Tag> {
    return this
      .tagRepository
      .findOneBy({ tag_id })
  }

  private async getCategory(category_id: number): Promise<Category> {
    return this
      .categoryRepository
      .findOneBy({ category_id })
  }

  async validatePostOwnership(userId: string, postId: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: {
        post_id: postId,
        author: { user_id: userId } },
    });

    if (!post) throw new NotFoundException();
    
    return post;
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: { post_id: id },
      relations: this.relations,
    });
  }

  async createPost(post: CreatePostDto): Promise<Post> {
    const [author, tags, categories] = await Promise.all([
      this.userService.findOne(post.author),
      Promise.all(post.tags.map(this.getTag)),
      Promise.all(post.categories.map(this.getCategory)),
    ]);

    return this.postRepository.save({
      ...post,
      author,
      categories,
      tags,
      created_at: new Date(),
    });
  }

  async updatePost(id: number, post: UpdatePostDto): Promise<Post> {
    const existingPost = await this.findOne(id);
    if (!existingPost) throw new NotFoundException();

    const [author, tags, categories] = await Promise.all([
      this.userService.findOne(post.author),
      Promise.all(post.tags.map(this.getTag)),
      Promise.all(post.categories.map(this.getCategory)),
    ]);

    const updatedPost = {
      ...existingPost,
      ...post,
      author,
      categories,
      tags,
      created_at: new Date(),
    }

    await this
      .postRepository
      .manager
      .transaction(async (manager) => {
        await manager.update(
          Post,
          { post_id: id },
          updatedPost
        );
      });

    return updatedPost;
  }

  async deletePost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}