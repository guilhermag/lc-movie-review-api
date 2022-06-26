import { IsNotEmpty, IsString } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  idIMDB: string;
  @IsNotEmpty()
  @IsString()
  name: string | null;
}
