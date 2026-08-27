import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repository/transaction.repository';
import { createTransactionInput } from '../types/transaction.types';
import { toTransactionResponse } from '../mapper/transaction.mapper';
import { Prisma } from 'src/generated/prisma/client';
import { InsufficientBalance } from '../exception/transaction.exception';

@Injectable()
export class TransactionService {
  constructor(private readonly transactionrepo: TransactionRepository) {}

  async createTransaction(transactionInput: createTransactionInput, userId: number) {
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
}
