import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QuoteCommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;
}
