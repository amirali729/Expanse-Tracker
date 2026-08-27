import { IsEnum, IsNotEmpty, IsPositive, IsString, MinLength } from 'class-validator';
import { TransactionType } from 'src/generated/prisma/enums';

export class CreateTransationDto {
  @IsNotEmpty()
  @IsPositive({ message: 'amount cannot be negative' })
  amount: number;

  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsNotEmpty()
  @IsPositive()
  categoryId: number;

  @IsNotEmpty()
  @IsPositive()
  accountId: number;

  @IsNotEmpty({ message: 'please provide description of the description' })
  @IsString()
  @MinLength(15, { message: 'description should be greater than 15 characters' })
  description: string;
}
