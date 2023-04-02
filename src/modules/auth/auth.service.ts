import { Injectable, ConflictException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import {
  RegisterUserDto,
  LoginUserDto,
  User,
  UserService
} from '../user';

@Injectable()
export class AuthService {
  payload: Object;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private generateToken() {
    return this.jwtService.sign(
      this.payload,
      { secret: process.env.JWT_SECRET }
    )
  }

  private async isExistingUser(user: RegisterUserDto): Promise<boolean> {
    const isExistingEmail = (await this.userService.findOneByUsernameOrEmail(user.email))
    
    const isExistingUsername = (await this.userService.findOneByUsernameOrEmail(user.username))
    
    if(isExistingEmail || isExistingUsername) new ConflictException()

    return !!(isExistingEmail || isExistingUsername)
  }
 
  async validateUser(credentials: LoginUserDto): Promise<User > {
    const { username, password } = credentials

    const user = await this
      .userService
      .findOneByUsernameOrEmail(username);

   if(!user) new UnauthorizedException()
    
   const wrongCredentials = !(user && await compare(password, user.password))

   if(wrongCredentials) new UnauthorizedException()

   if(!wrongCredentials) return user;
  }

  async login(user: User) {
    const { password, ..._user } = user

    this.payload = {
      ..._user,
      sub: _user.user_id,
      role: _user.role
    };
    
    return { ..._user, token: this.generateToken() };
  }

  async register(user: RegisterUserDto): Promise<User> {
    if (user.username && user.password) new BadRequestException()
  
    const isExistingUser = await this.isExistingUser(user);

    if(isExistingUser) return
    
    const newUser = await this.userService.create(user);
    
    return newUser;
  }
}