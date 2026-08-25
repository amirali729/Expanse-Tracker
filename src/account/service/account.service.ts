import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AccountRespository } from '../repository/account.repository';
import { createdAccountData, createdAccountResponse } from '../types/account.types';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepo: AccountRespository) {}

  async createAccount(accountData: createdAccountData): Promise<createdAccountResponse> {
    const account = await this.accountRepo.findAccountByUser(accountData.userId, accountData.name);
    if (account) {
      throw new ConflictException('account name with this name already exists');
    }
    const createdAccount = await this.accountRepo.create(accountData);
    if (!createdAccount) {
      throw new InternalServerErrorException('cannot create user right now please try again');
    }
    if (createdAccount.provider) {
      return {
        name: createdAccount.name,
        type: createdAccount.accountType,
        provider: createdAccount.provider,
        createdAt: createdAccount.createdAt,
      };
    }
    return {
      name: createdAccount.name,
      type: createdAccount.accountType,
      createdAt: createdAccount.createdAt,
    };
  }
}
