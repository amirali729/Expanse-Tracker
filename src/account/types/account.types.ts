import { AccountType } from '../../generated/prisma/enums';
export type createdAccountData = {
  userId: number;
  name: string;
  type: AccountType;
  provider?: string;
};

export type createdAccountResponse = {
  name: string;
  type: AccountType;
  provider?: string | null;
  createdAt: Date;
};
