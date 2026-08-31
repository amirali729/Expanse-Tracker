import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { createdAccountData } from '../types/account.types';
import { Account } from 'src/generated/prisma/client';

@Injectable()
export class AccountRespository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: createdAccountData): Promise<Account | null> {
    const account = await this.prisma.account.create({
      data: {
        userId: data.userId,
        name: data.name,
        provider: data.provider,
        accountType: data.type,
      },
    });
    return account;
  }

  async findAccountByUser(userId: number, name: string): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({
      where: {
        userId,
        name,
      },
    });
    return account;
  }

  async findAccountById(userId: number, accountId: number): Promise<Account | null> {
    const account = await this.prisma.account.findFirst({
      where: {
        userId,
        id: accountId,
      },
    });
    return account;
  }

  async findAllAccountByUserId(userId: number): Promise<Account[]> {
    const accounts = await this.prisma.account.findMany({
      where: {
        userId,
      },
    });
    return accounts;
  }

  async delete(accountId: number): Promise<Account> {
    return await this.prisma.account.delete({
      where: {
        id: accountId,
      },
    });
  }
}
