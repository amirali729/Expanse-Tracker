import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { AccountType } from 'src/generated/prisma/enums';
export class CreateAccountDto {
  @IsString({ message: 'please provide name in the text' })
  @IsNotEmpty({ message: 'please provide description of the description' })
  @MaxLength(15, { message: 'account name should not be greater than 15 character' })
  name: string;

  @IsEnum(AccountType, {
    message: 'account type should be one of these (CASH, BANK, WALLET, CREDIT_CARD)',
  })
  type: AccountType;

  @IsString({ message: 'please provide name in the text' })
  @IsNotEmpty({ message: 'please provide provider of the description' })
  @IsOptional()
  @MaxLength(15, { message: 'provider name cannot be greater than 15 characters' })
  provider: string;
}
