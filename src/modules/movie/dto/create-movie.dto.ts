import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  idIMDB: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string | null;
}
