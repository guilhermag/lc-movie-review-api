import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'The plot of this movie just blew my mind',
    description: 'A movie comment',
    default: 'message of the comment',
  })
  description: string;
}

export type Role = 'READER' | 'BASIC' | 'ADVANCED' | 'MODERATOR';

export type Vote = 'LIKE' | 'DISLIKE';
