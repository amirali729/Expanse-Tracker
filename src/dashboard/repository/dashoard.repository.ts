import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalIncome(userId: number) {
    const totalIncome = await this.prisma.transaction.aggregate({
      where: {
        userId,
        transactionType: 'INCOME',
        deletedAt: null,
      },
      _sum: {
        amount: true,
      },
    });
    return totalIncome;
  }

  async getTotalExpenses(userId: number) {
    const totalExpense = await this.prisma.transaction.aggregate({
      where: {
        userId,
        transactionType: 'EXPENSE',
        deletedAt: null,
      },
      _sum: {
        amount: true,
      },
    });
    return totalExpense;
  }

  async getAccountsWithBalances(userId: number) {
    const accounts = await this.prisma.account.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      select: {
        id: true,
        name: true,
        transactions: {
          where: {
            deletedAt: null,
          },
          select: {
            amount: true,
            transactionType: true,
          },
        },
      },
    });

    return accounts.map((account) => {
      let balance = 0;

      for (const transaction of account.transactions) {
        if (transaction.transactionType === 'INCOME') {
          balance += Number(transaction.amount);
        } else {
          balance -= Number(transaction.amount);
        }
      }

      return {
        id: account.id,
        name: account.name,
        balance,
      };
    });
  }

  async getRecentTransactions(userId: number) {
    const transaction = await this.prisma.transaction.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: {
        transactionDate: 'desc',
      },
      take: 5,
      select: {
        id: true,
        amount: true,
        transactionType: true,
        categoryId: true,
        accountId: true,
        transactionDate: true,
        description: true,
      },
    });
    return transaction;
  }
}
