import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;
  @ApiPropertyOptional()
  name?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}

export type Role = 'READER' | 'BASIC' | 'ADVANCED' | 'MODERATOR';
