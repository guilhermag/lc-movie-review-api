import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  name?: string | null;

  @IsNotEmpty()
  @IsString()
  password: string;
}
// 1:00:24
