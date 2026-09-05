import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from '../service/report.service';
import { AuthGuard } from 'src/shared/guard/auth';
import type { Request } from 'express';
import { TransactionType } from 'src/generated/prisma/enums';
import { MonthlyReportQueryDto } from '../dto/report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':transactionType')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getTransactionReport(
    @Req() request: Request,
    @Query() query: MonthlyReportQueryDto,
    @Param('transactionType') type: TransactionType,
  ) {
    const userId = request.user.userId;
    const year = Number(query.year);
    const month = Number(query.month);
    const report = await this.reportService.getMonthlyTotal(userId, type, year, month);
    return {
      statusCode: HttpStatus.OK,
      message: 'Monthly income retrieved successfully',
      data: report,
    };
  }

  @Get('expenses/categories')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getTransactionCategoriesReport(
    @Req() request: Request,
    @Query() query: MonthlyReportQueryDto,
  ) {
    const userId = request.user.userId;
    const year = Number(query.year);
    const month = Number(query.month);
    const report = await this.reportService.getMonthlyCategories(userId, year, month);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category expenses retrieved successfully',
      data: report,
    };
  }
}
