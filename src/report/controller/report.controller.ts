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
import { MonthlyReportQueryDto, ReportQueryDto } from '../dto/report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':transactionType')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getTransactionReport(
    @Req() request: Request,
    @Query() query: MonthlyReportQueryDto,
    @Param('transactionType') type: TransactionType,
  ) {
    const userId = request.user.userId;
    return {
      statusCode: HttpStatus.OK,
      message: 'Monthly income retrieved successfully',
      data: {
        userId,
        query,
        type,
      },
    };
  }

  @Get(':transactionType/categories')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getTransactionCategoriesReport(
    @Req() request: Request,
    @Query() query: MonthlyReportQueryDto,
    @Param('transactionType') type: TransactionType,
  ) {
    const userId = request.user.userId;
    return {
      statusCode: HttpStatus.OK,
      message: 'Category expenses retrieved successfully',
      data: {
        userId,
        query,
        type,
      },
    };
  }

  @Get('categories')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getCategoriesReport(@Req() request: Request, @Query() query: MonthlyReportQueryDto) {
    const userId = request.user.userId;
    return {
      statusCode: HttpStatus.OK,
      message: 'Category expenses retrieved successfully',
      data: {
        query,
        userId,
      },
    };
  }

  @Get('accounts/:accountId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  getAccountsReports(
    @Req() request: Request,
    @Query() query: ReportQueryDto,
    @Param('accountId') accountId: number,
  ) {
    const userId = request.user.userId;
    return {
      statusCode: HttpStatus.OK,
      message: 'Category expenses retrieved successfully',
      data: {
        userId,
        accountId,
        query,
      },
    };
  }
}
