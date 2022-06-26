import { IsNotEmpty } from 'class-validator';

export class ReviewDto {
  @IsNotEmpty()
  movieScore: number;
}
