import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { AuthGuard } from 'src/shared/guard/auth';
import { CreateAccountDto, UpdateAccountDto } from '../dto/account.dto';
import type { Request } from 'express';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createAccount(@Body() dto: CreateAccountDto, @Req() request: Request) {
    const accountData = {
      ...dto,
      userId: request.user.userId,
    };
    const data = await this.accountService.createAccount(accountData);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Account Created SuccessFully',
      data: data,
    };
  }

  @Get(':accountId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async accountDetails(@Req() request: Request, @Param('accountId') id: string) {
    const userId = request.user.userId;
    const accountId = Number(id);
    const account = await this.accountService.accountDetail(userId, accountId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Account retrieved successfully',
      data: account,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async allAccount(@Req() request: Request) {
    const userId = request.user.userId;
    const accounts = await this.accountService.getAllAccounts(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Accounts retrieved successfully',
      data: accounts,
    };
  }

  @Delete(':accountId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async delete(@Req() request: Request, @Param('accountId') id: string) {
    const userId = request.user.userId;
    const accountId = Number(id);
    const Account = await this.accountService.deleteAccount(userId, accountId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Account deleted successfully',
      data: Account,
    };
  }

  @Patch(':accountId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async update(
    @Param('accountId') id: string,
    @Req() request: Request,
    @Body() dto: UpdateAccountDto,
  ) {
    const userId = request.user.userId;
    const accountId = Number(id);
    const account = await this.accountService.updateAccount(accountId, userId, dto);

    return {
      statusCode: HttpStatus.OK,
      message: 'Account updated successfully',
      data: account,
    };
  }
}
