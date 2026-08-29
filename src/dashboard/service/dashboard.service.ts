import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../repository/dashoard.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async getDashboard(userId: number) {
    const [incomeResult, expenseResult, accounts, recentTransactions] = await Promise.all([
      this.dashboardRepository.getTotalIncome(userId),
      this.dashboardRepository.getTotalExpenses(userId),
      this.dashboardRepository.getAccountsWithBalances(userId),
      this.dashboardRepository.getRecentTransactions(userId),
    ]);

    const totalIncome = Number(incomeResult._sum.amount ?? 0);
    const totalExpenses = Number(expenseResult._sum.amount ?? 0);

    const totalBalance = totalIncome - totalExpenses;

    return {
      totalBalance,
      totalIncome,
      totalExpenses,
      accounts,
      recentTransactions: recentTransactions.map((transaction) => ({
        ...transaction,
        amount: Number(transaction.amount),
      })),
    };
  }
}
