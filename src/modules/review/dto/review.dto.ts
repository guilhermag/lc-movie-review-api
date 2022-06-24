import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ReviewDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  name?: string | null;

  @IsNotEmpty()
  @IsString()
  password: string;
}
