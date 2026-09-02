import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { TransactionType } from 'src/generated/prisma/enums';

@Injectable()
export class ReportRespository {
  constructor(private readonly prisma: PrismaService) {}

  async getMonthlyTotal(
    userId: number,
    transactionType: TransactionType,
    startDate: Date,
    endDate: Date,
  ) {
    const result = await this.prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        transactionType,
        transactionDate: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    return result._sum.amount ?? 0;
  }

  async getMonthlyCategories(userId: number, startDate: Date, endDate: Date) {
    const categories = await this.prisma.category.findMany({
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
            userId,
            transactionType: 'EXPENSE',
            transactionDate: {
              gte: startDate,
              lt: endDate,
            },
          },
          select: {
            amount: true,
            transactionType: true,
          },
        },
      },
    });

    return categories.map((category) => {
      let balance = 0;

      for (const transaction of category.transactions) {
        if (transaction.transactionType === 'EXPENSE') {
          balance += Number(transaction.amount);
        }
      }

      return {
        id: category.id,
        name: category.name,
        balance,
      };
    });
  }
}
