import { ApiProperty } from '@nestjs/swagger';

export class CommentSwagger {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  authorId: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  likes: number;
  @ApiProperty()
  dislikes: number;
  @ApiProperty()
  replies: any[];
  @ApiProperty()
  repeated: boolean;
  @ApiProperty()
  movieId: number;
}
