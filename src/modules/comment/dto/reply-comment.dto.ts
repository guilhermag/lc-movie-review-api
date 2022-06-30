import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReplyCommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'I dont agree with you',
    description: 'A reply of another comment',
    default: 'message of the comment reply',
  })
  description: string;
}
