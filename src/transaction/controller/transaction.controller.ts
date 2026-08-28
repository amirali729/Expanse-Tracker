import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from '../service/transaction.service';
import { AuthGuard } from 'src/shared/guard/auth';
import type { Request } from 'express';
import { CreateTransationDto } from '../dto/transaction.dto';
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createTransaction(@Body() dto: CreateTransationDto, @Req() request: Request) {
    const transaction = await this.transactionService.createTransaction(dto, request.user.userId);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Transaction created successfully',
      data: transaction,
    };
  }
}
