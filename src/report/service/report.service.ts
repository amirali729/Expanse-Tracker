import { Injectable } from '@nestjs/common';
import { ReportRespository } from '../repository/report.repository';
import { TransactionType } from 'src/generated/prisma/enums';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepo: ReportRespository) {}

  async getMonthlyTotal(userId: number, type: TransactionType, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);

    const endDate = new Date(year, month, 1);

    const total = await this.reportRepo.getMonthlyTotal(userId, type, startDate, endDate);

    return {
      year,
      month,
      total,
    };
  }

  async getMonthlyCategories(userId: number, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);

    const endDate = new Date(year, month, 1);

    const total = await this.reportRepo.getMonthlyCategories(userId, startDate, endDate);

    return {
      year,
      month,
      total,
    };
  }
}
