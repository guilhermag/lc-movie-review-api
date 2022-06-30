import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EditCommentDto {
  @IsNotEmpty()
  @ApiProperty({
    example:
      'The plot of this movie just blew my mind **edited, saw this movie 10 times',
    description: 'A existing comment that was edited',
    default: 'new message of the comment',
  })
  newDescription: string;
}
