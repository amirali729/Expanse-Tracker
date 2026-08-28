import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { createTransactionInput } from '../types/transaction.types';
import { Transaction } from 'src/generated/prisma/client';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(transactionData: createTransactionInput, userId: number) {
    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        amount: transactionData.amount,
        transactionType: transactionData.transactionType,
        categoryId: transactionData.categoryId,
        accountId: transactionData.accountId,
        description: transactionData.description,
      },
    });
    return transaction;
  }

  async getUserCurrentTotalAmount(userId: number) {
    const totalAmount = await this.prisma.transaction.aggregate({
      where: {
        userId,
        transactionType: 'INCOME',
      },
      _sum: {
        amount: true,
      },
    });
    return totalAmount;
  }

  async getAccountById(userId: number, accountId: number) {
    const account = await this.prisma.account.findFirst({
      where: {
        id: accountId,
        userId,
      },
    });
    return account;
  }

  async getCategoryById(userId: number, categoryId: number) {
    const category = await this.prisma.category.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });
    return category;
  }

  async findTransactionById(userId: number, transactionId: number): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        userId,
        id: transactionId,
      },
    });
    return transaction;
  }

  async deleteTransactionById(userId: number, transactionId: number): Promise<Transaction> {
    const transaction = await this.prisma.transaction.delete({
      where: {
        userId,
        id: transactionId,
      },
    });
    return transaction;
  }

  async findAllTransactionsByUserId(userId: number): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        userId,
      },
    });
    return transactions;
  }
}
