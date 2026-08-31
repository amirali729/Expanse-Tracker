import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'please provide name in the text' })
  @IsNotEmpty({ message: 'name shouldnot be empty' })
  @MaxLength(15, { message: 'category name should not be lower than 15 character' })
  name: string;

  @IsString({ message: 'please provide name in the text' })
  @IsNotEmpty({ message: 'description shouldnot be empty' })
  @MinLength(10, { message: 'description name cannot be greater than 10 characters' })
  description: string;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'please provide name in the text' })
  @MaxLength(100)
  @MinLength(15, { message: 'name should be greater than 15 characters' })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'description shouldnot be empty' })
  @IsString({ message: 'please provide description in the text' })
  @MaxLength(100)
  @MinLength(15, { message: 'description should be greater than 15 characters' })
  description?: string;
}
