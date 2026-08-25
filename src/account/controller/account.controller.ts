import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import { AuthGuard } from 'src/shared/guard/auth';
import { CreateAccountDto } from '../dto/account.dto';
import type { Request } from 'express';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @UseGuards(AuthGuard)
  async CreateAccount(@Body() dto: CreateAccountDto, @Req() request: Request) {
    const accountData = {
      ...dto,
      userId: request.user.userId,
    };
    await this.accountService.createAccount(accountData);
  }
}
