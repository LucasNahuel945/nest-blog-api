import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class LoginUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(/^[a-zA-Z0-9]*$/)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(/^[^\\]+$/)
    @Length(8)
    password: string;
}
