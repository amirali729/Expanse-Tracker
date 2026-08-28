import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsString({ message: 'please provide usernmae in the text' })
  @IsNotEmpty({ message: 'please provide username of the description' })
  @MaxLength(100, { message: 'username cannot be greater than 100 characters' })
  username: string;

  @IsString({ message: 'please provide email in the text' })
  @IsNotEmpty({ message: 'please provide email of the description' })
  @IsEmail()
  @MaxLength(30, { message: 'email cannot be greater than 30 characters' })
  email: string;

  @IsString({ message: 'please provide password in the text' })
  @IsNotEmpty({ message: 'please provide password of the description' })
  @MinLength(8, { message: 'password cannot be lower than 8 characters' })
  password: string;
}

export class loginUserDto {
  @IsString({ message: 'please provide usernmae in the text' })
  @IsNotEmpty({ message: 'please provide username of the description' })
  @MaxLength(100, { message: 'username cannot be greater than 100 characters' })
  username: string;

  @IsString({ message: 'please provide password in the text' })
  @IsNotEmpty({ message: 'please provide password of the description' })
  @MinLength(8, { message: 'password cannot be lower than 8 characters' })
  password: string;
}
