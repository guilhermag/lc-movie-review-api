import { IsNotEmpty } from 'class-validator';

export type Vote = 'LIKE' | 'DISLIKE';

export class CommentVoteDto {
  @IsNotEmpty()
  vote: Vote;
}
