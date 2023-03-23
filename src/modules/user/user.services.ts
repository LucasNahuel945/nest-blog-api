import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['user_id', 'name', 'username', 'email']
    });
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { user_id: id },
      select: ['user_id', 'name', 'username', 'email'],
    });
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, user: User): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}