import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EditCommentDto {
  @IsNotEmpty()
  @ApiProperty()
  newDescription: string;
}
