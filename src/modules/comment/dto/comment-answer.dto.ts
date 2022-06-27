import { IsNotEmpty } from 'class-validator';

export class CommentAnswerDto {
  @IsNotEmpty()
  answerComment: string;
}
