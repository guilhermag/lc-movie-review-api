import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QuoteCommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'This comment is about that movie',
    description: 'A new comment that quotes another one',
    default: 'message of the quote',
  })
  description: string;
}
