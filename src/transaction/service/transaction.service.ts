import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../repository/transaction.repository';
import { createTransactionInput } from '../types/transaction.types';
import { toTransactionResponse } from '../mapper/transaction.mapper';
import { Prisma } from 'src/generated/prisma/client';
import { InsufficientBalance } from '../exception/transaction.exception';
import { UpdateTransactionDto } from '../dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionrepo: TransactionRepository) {}

  async createTransaction(transactionInput: createTransactionInput, userId: number) {
    const account = await this.transactionrepo.getAccountById(userId, transactionInput.accountId);
    if (!account) {
      throw new NotFoundException({
        code: 'ACCOUNT_NOT_FOUND',
        message: 'account with this name not exists',
      });
    }

    const category = await this.transactionrepo.getCategoryById(
      userId,
      transactionInput.categoryId,
    );
    if (!category) {
      throw new NotFoundException({
        code: 'CATEGORY_NOT_FOUND',
        message: 'category with this name not exists',
      });
    }
    if (transactionInput.transactionType === 'INCOME') {
      const transaction = await this.transactionrepo.create(transactionInput, userId);
      return toTransactionResponse(transaction);
    }

    const userTotalAmount = await this.transactionrepo.getUserCurrentTotalAmount(userId);
    if ((userTotalAmount._sum.amount ?? new Prisma.Decimal(0)).lessThan(transactionInput.amount)) {
      throw new InsufficientBalance();
    }
    const transaction = await this.transactionrepo.create(transactionInput, userId);
    return toTransactionResponse(transaction);
  }

  async transactionDetail(userId: number, transactionId: number) {
    const transaction = await this.transactionrepo.findTransactionById(userId, transactionId);
    if (!transaction) {
      throw new NotFoundException('transaction not found');
    }

    return toTransactionResponse(transaction);
  }

  async deleteTransaction(userId: number, transactionId: number) {
    const transaction = await this.transactionrepo.findTransactionById(userId, transactionId);
    if (!transaction) {
      throw new NotFoundException({
        code: 'TRANSACTION_NOT_FOUND',
        message: 'no transaction is found',
      });
    }
    const deletedTransaction = await this.transactionrepo.deleteTransactionById(
      userId,
      transactionId,
    );

    return toTransactionResponse(deletedTransaction);
  }

  async getAllTransaction(userId: number) {
    const transactions = await this.transactionrepo.findAllTransactionsByUserId(userId);
    if (!transactions) {
      throw new NotFoundException({
        code: 'TRANSACTION_NOT_FOUND',
        message: 'no transaction is found',
      });
    }

    return transactions.map(toTransactionResponse);
  }

  async updateTransaction(transactionId: number, userId: number, dto: UpdateTransactionDto) {
    const transaction = await this.transactionrepo.findTransactionById(userId, transactionId);

    if (!transaction) {
      throw new NotFoundException({
        code: 'TRANSACTION_NOT_FOUND',
        message: 'no transaction is found',
      });
    }

    const updateTransaction = await this.transactionrepo.update(userId, transactionId, dto);

    return toTransactionResponse(updateTransaction);
  }
}
