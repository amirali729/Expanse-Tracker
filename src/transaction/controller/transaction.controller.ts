import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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

  @Get(':transactionId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async accountDetails(@Req() request: Request, @Param('transactionId') id: string) {
    const userId = request.user.userId;
    const transactionId = Number(id);
    const transaction = await this.transactionService.transactionDetail(userId, transactionId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Transaction retrieved successfully',
      data: transaction,
    };
  }

  @Delete(':transactionId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async delete(@Req() request: Request, @Param('transactionId') id: string) {
    const userId = request.user.userId;
    const transactionId = Number(id);
    const transaction = await this.transactionService.deleteTransaction(userId, transactionId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Transaction deleted successfully',
      data: transaction,
    };
  }
}
