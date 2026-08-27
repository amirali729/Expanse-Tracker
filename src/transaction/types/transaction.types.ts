import { TransactionType } from 'src/generated/prisma/enums';

export type createTransactionInput = {
  amount: number;
  transactionType: TransactionType;
  categoryId: number;
  accountId: number;
  description: string;
};
