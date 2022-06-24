import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  name?: string | null;

  @IsNotEmpty()
  @IsString()
  password: string;
}
