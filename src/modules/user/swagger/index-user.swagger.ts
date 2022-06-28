import { ApiProperty } from '@nestjs/swagger';

export class IndexUserSwagger {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  score: number;
  @ApiProperty()
  role: string;
  @ApiProperty()
  quotedCommentsId: string[];
}
