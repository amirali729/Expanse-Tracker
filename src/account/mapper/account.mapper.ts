import { Account } from 'src/generated/prisma/client';

export function toAccountResponse(account: Account) {
  return {
    id: account.id,
    name: account.name,
    type: account.accountType,
    provider: account.provider,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
}
