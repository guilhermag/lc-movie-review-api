import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommentAnswerDto {
  @IsNotEmpty()
  @ApiProperty()
  answerComment: string;
}
