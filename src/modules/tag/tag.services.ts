import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  async findOne(id: string): Promise<Tag> {
    return this.tagRepository.findOneBy({ tag_id: id });
  }

  async create(tag: Tag): Promise<Tag> {
    return this.tagRepository.save(tag);
  }

  async update(id: number, tag: Tag): Promise<void> {
    await this.tagRepository.update(id, tag);
  }

  async delete(id: number): Promise<void> {
    await this.tagRepository.delete(id);
  }
}