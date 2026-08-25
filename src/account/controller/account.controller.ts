import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { AuthGuard } from 'src/shared/guard/auth';
import { CreateAccountDto } from '../dto/account.dto';
import type { Request } from 'express';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async CreateAccount(@Body() dto: CreateAccountDto, @Req() request: Request) {
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
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AuthGuard)
  async updateAccount(@Req() request: Request, @Param('accountId') id: string) {
    const userId = request.user.userId;
    const accountId = Number(id);
    const data = await this.accountService.accountDetail(userId, accountId);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Account retrieved successfully',
      data: data,
    };
  }
}
