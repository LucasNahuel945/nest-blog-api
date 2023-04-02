import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { User } from './user.entity';
import { UserRole } from '../../access-control/roles.enum';
import { UpdateUserDto } from './user.dto';
import { uuid } from 'uuidv4';

@Injectable()
export class UserService {
  select: FindManyOptions<User> | FindOneOptions<User>

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    this.select = { select : ['user_id', 'firstname', 'lastname', 'username', 'email', 'role'] }
  }

  private async encryptPassword(password: string): Promise<string> {
    const salt = await genSalt(parseInt(process.env.SALT));

    return hash(password, salt);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find(this.select);
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      ...this.select,
      where: { user_id: id },
    });
  }

  async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    return this.userRepository.findOne({
      where: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ],
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    const password = await this.encryptPassword(user.password);

    const newUser = {
      ...user,
      user_id: uuid(),
      password,
      role: UserRole.READER,
      created_at: new Date()
    }

    return this.userRepository.save(newUser);
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const existingUser = await this.findOne(id);

    if (!existingUser) throw new NotFoundException();
    
    await this.userRepository.update({ user_id: id }, { ...existingUser, ...user });

    return this.findOne(id);
  }

  async delete(id: string): Promise<User> {
    const existingUser = await this.findOne(id);

    if (!existingUser) throw new NotFoundException();
    
    this.userRepository.delete(id);

    return existingUser;
  }
}