import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EditReviewDto {
  @IsNotEmpty()
  @ApiProperty()
  newScore: number;
}
