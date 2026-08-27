import { Transaction } from 'src/generated/prisma/client';

export function toTransactionResponse(transaction: Transaction) {
  return {
    id: transaction.id,
    categoryId: transaction.categoryId,
    accountId: transaction.accountId,
    transactionDate: transaction.transactionDate,
    description: transaction.description,
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  };
}
