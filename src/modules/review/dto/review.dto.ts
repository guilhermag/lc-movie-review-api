import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ReviewDto {
  @IsNotEmpty()
  @ApiProperty()
  movieScore: number;
}
