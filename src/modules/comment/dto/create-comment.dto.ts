import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

export type Role = 'READER' | 'BASIC' | 'ADVANCED' | 'MODERATOR';

export type Vote = 'LIKE' | 'DISLIKE';
