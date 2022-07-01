import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'guilhermag@gmail.com',
    description: 'The email of the user that is beeing created',
    default: 'userEmail@email.com',
  })
  email: string;

  @ApiPropertyOptional({
    example: 'Guilherme Gabriel',
    description: 'The name of the user that is beeing created',
    default: 'name of the user',
  })
  name?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'guilhermePassword#123',
    description: 'The password of user that is beeing created',
    default: 'userPassword',
  })
  password: string;
}

export type Role = 'READER' | 'BASIC' | 'ADVANCED' | 'MODERATOR';
