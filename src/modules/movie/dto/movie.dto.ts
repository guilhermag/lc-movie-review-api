import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class MovieDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  name?: string | null;

  @IsNotEmpty()
  @IsString()
  password: string;
}
