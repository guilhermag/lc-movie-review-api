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
  title: string | null;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  year: number;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  genre: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  director: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  plot: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  language: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type: string;
  @ApiProperty()
  comments?: string[];
  @ApiProperty()
  reviews?: number[];
}
