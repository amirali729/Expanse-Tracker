import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15, { message: 'category name should not be lower than 15 character' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'description name cannot be greater than 10 characters' })
  description: string;
}
