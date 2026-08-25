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
}
