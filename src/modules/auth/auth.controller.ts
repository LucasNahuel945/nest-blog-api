import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthService } from './auth.service';

@ApiTags("Auth Endpoint")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginUserDto) {
    const errors = await validate(credentials)
    if (errors.length > 0) throw new BadRequestException();

    const user = await this
      .authService
      .validateUser(credentials)
    
    if (user) return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: RegisterUserDto) {
    const errors = await validate(user)
    if (errors.length > 0) throw new BadRequestException();

    return this.authService.register(user);
  }
}