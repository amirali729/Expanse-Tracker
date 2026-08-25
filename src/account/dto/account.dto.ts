import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { AccountType } from 'src/generated/prisma/enums';
export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15, { message: 'account name should not be greate than 15 character' })
  name: string;

  @IsEnum(AccountType)
  type: AccountType;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(15, { message: 'provider name cannot be greater than 15 characters' })
  provider: string;
}
