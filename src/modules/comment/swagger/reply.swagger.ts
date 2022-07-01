import { ApiProperty } from '@nestjs/swagger';

export class ReplySwagger {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  authorId: number;
  @ApiProperty({
    description:
      'This field is the message that will be shown in the new comment created by the reply',
    default:
      'Comment: {repliedCommentDescription}, from @{authorEmail}, replied by @{writerEmail} with the message: {replyMessage}',
  })
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
