import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EditReviewDto {
  @IsNotEmpty()
  @ApiProperty({
    example: '5',
    description: 'A movie review, can be a value from 0 to 10',
  })
  newScore: number;
}
