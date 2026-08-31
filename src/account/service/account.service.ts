import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AccountRespository } from '../repository/account.repository';
import { createdAccountData, createdAccountResponse } from '../types/account.types';
import { toAccountResponse } from '../mapper/account.mapper';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepo: AccountRespository) {}

  async createAccount(accountData: createdAccountData): Promise<createdAccountResponse> {
    const account = await this.accountRepo.findAccountByUser(accountData.userId, accountData.name);
    if (account) {
      throw new ConflictException({
        code: 'ACCOUNT_ALREADY_EXISTS',
        message: 'An account with this name already exists',
      });
    }
    const createdAccount = await this.accountRepo.create(accountData);
    if (!createdAccount) {
      throw new InternalServerErrorException({
        code: 'ACCOUNT_CREATION_FAILED',
        message: 'account could not be created rightnow please try again later',
      });
    }
    return toAccountResponse(createdAccount);
  }

  async accountDetail(userId: number, accountId: number) {
    const account = await this.accountRepo.findAccountById(userId, accountId);
    if (!account) {
      throw new NotFoundException({
        code: 'ACCOUNT_NOT_FOUND',
        message: 'account with this name not exists',
      });
    }

    return toAccountResponse(account);
  }

  async getAllAccounts(userId: number) {
    const accounts = await this.accountRepo.findAllAccountByUserId(userId);
    if (!accounts) {
      throw new NotFoundException({
        code: 'ACCOUNT_NOT_FOUND',
        message: 'account with this name not exists',
      });
    }

    return accounts.map(toAccountResponse);
  }

  async deleteAccount(userId: number, accountId: number) {
    const account = await this.accountRepo.findAccountById(userId, accountId);

    if (!account) {
      throw new NotFoundException({
        code: 'ACCOUNT_NOT_FOUND',
        message: 'account with this name not exists',
      });
    }

    const deletedAccount = await this.accountRepo.delete(account.id);
    return toAccountResponse(deletedAccount);
  }
}
