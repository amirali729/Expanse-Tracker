import { IsEmail, IsNotEmpty, IsString, maxLength, MaxLength } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'username cannot be greater than 100 characters' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100, { message: 'email cannot be greater than 100 characters' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'password cannot be greater than 100 characters' })
  password: string;
}

export class loginUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'username cannot be greater than 100 characters' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100, { message: 'password cannot be greater than 100 characters' })
  password: string;
}
