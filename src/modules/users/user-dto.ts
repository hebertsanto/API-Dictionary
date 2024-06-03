import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEmail()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
