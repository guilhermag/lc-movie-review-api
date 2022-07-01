import { ApiProperty } from '@nestjs/swagger';

export class ReviewSwagger {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  authorId: number;
  @ApiProperty()
  movieScore: number;
  @ApiProperty()
  movieId: number;
}
