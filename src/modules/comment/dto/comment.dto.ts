import { IsNotEmpty } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  description: string;
}

export type Role = 'READER' | 'BASIC' | 'ADVANCED' | 'MODERATOR';

export type Vote = 'LIKE' | 'DISLIKE';
