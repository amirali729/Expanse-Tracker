import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TransactionType } from 'src/generated/prisma/enums';

export class CreateTransationDto {
  @IsNotEmpty({ message: 'missing ID please provide category ID' })
  @IsPositive({ message: 'amount cannot be negative' })
  amount: number;

  @IsEnum(TransactionType, { message: 'the transaction type should be EXPENSE or INCOME' })
  transactionType: TransactionType;

  @IsNotEmpty({ message: 'missing ID please provide category ID' })
  @IsPositive({ message: 'category ID couldnot be negative' })
  categoryId: number;

  @IsNotEmpty({ message: 'missing ID please provide category ID' })
  @IsPositive({ message: 'account Id couldnot be negative' })
  accountId: number;

  @IsNotEmpty({ message: 'description shouldnot be empty' })
  @IsString({ message: 'please provide description in the text' })
  @MinLength(15, { message: 'description should be greater than 15 characters' })
  description: string;
}

export class UpdateTransactionDto {
  @IsOptional()
  @IsNotEmpty({ message: 'missing ID please provide category ID' })
  @IsPositive({ message: 'amount cannot be negative' })
  amount?: number;

  @IsEnum(TransactionType, { message: 'the transaction type should be EXPENSE or INCOME' })
  transactionType?: TransactionType;

  @IsNotEmpty({ message: 'missing ID please provide category ID' })
  @IsPositive({ message: 'category ID couldnot be negative' })
  categoryId?: number;

  @IsNotEmpty({ message: 'missing ID please provide category ID' })
  @IsPositive({ message: 'account Id couldnot be negative' })
  accountId?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'description shouldnot be empty' })
  @IsString({ message: 'please provide description in the text' })
  @MaxLength(100)
  @MinLength(15, { message: 'description should be greater than 15 characters' })
  description?: string;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  transactionDate?: Date;
}
