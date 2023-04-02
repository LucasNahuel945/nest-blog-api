import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9]*$/)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]*$/)
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z]*$/)
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(/^[^\\]+$/)
  @Length(8)
  password: string;

}
