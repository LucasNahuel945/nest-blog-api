import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { User } from './user.entity';
import { Post as UserPost } from '../post';
import { UserService } from './user.services';
import { CreatePostDto, CreateUserDto, UpdatePostDto } from './dto';
import { AllowRoles, OnlyAdmins, OnlyOwner } from 'src/access-control';
import { UpdateUserDto } from './user.dto';
import { UserPostService } from './user.post.services';
import { UserRole } from 'src/access-control/roles.enum';

@ApiBearerAuth()
@ApiTags("Users Endpoints")
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userPostService: UserPostService
  ) {}
  
  @Get()
  @OnlyAdmins()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':user_id')
  @OnlyAdmins()
  async findOne(@Param('user_id') userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }
  
  @Post()
  @OnlyAdmins()
  async create(@Body() user: CreateUserDto): Promise<User> {
    const errors = await validate(user)
    
    if (errors.length > 0) throw new BadRequestException();

    return this.userService.create(user);
  }

  @Put(':user_id')
  @OnlyAdmins()
  async update(@Param('user_id') userId: string, @Body() user: UpdateUserDto): Promise<User> {
    return this.userService.update(+userId, user);
  }

  @OnlyAdmins()
  @Delete(':user_id')
  async delete(@Param('user_id') userId: string): Promise<User> {
    return this.userService.delete(+userId);
  }

  @Get(':user_id/owner')
  @OnlyOwner()
  async getOwnerInfo(@Param('user_id') userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }
  
  @Put(':user_id/owner')
  @OnlyOwner()
  async updateOwner(@Param('user_id') userId: string, @Body() user: UpdateUserDto): Promise<User> {
    return this.userService.update(+userId, user);
  }
  
  @Delete(':user_id/owner')
  @OnlyOwner()
  async deleteOwner(@Param('user_id') userId: string): Promise<User> {
    return this.userService.delete(+userId);
  }

  @Post(':user_id/posts')
  @OnlyOwner()
  @AllowRoles(UserRole.AUTHOR, UserRole.EDITOR)
  async createOwnPost(@Body() post: CreatePostDto): Promise<UserPost> {
    return this.userPostService.createPost(post);
  }

  @Put(':user_id/posts/edit/:post_id')
  @AllowRoles(UserRole.EDITOR)
  updatePost(@Param('post_id') postId: string, @Body() post: UpdatePostDto): Promise<UserPost> {
    return this.userPostService.updatePost(+postId, post);
  }

  @Put(':user_id/posts/:post_id')
  @OnlyOwner()
  @AllowRoles(UserRole.AUTHOR, UserRole.EDITOR)
  async updateOwnPost(
    @Param('post_id') postId: number,
    @Param('user_id') userId: number,
    @Body() post: UpdatePostDto
  ): Promise<UserPost> {
    await this.userPostService.validatePostOwnership(userId, postId);
    return this.userPostService.updatePost(+postId, post);
  }

  @Delete(':user_id/posts/:post_id')
  @OnlyOwner()
  @AllowRoles(UserRole.AUTHOR, UserRole.EDITOR)
  async deleteOwnPost(
    @Param('post_id') postId: number,
    @Param('user_id') userId: number,
  ): Promise<void> {
    await this.userPostService.validatePostOwnership(userId, postId);
    return this.userPostService.deletePost(+postId);
  }
}