import { Module } from '@nestjs/common';
import { AccountService } from './service/account.service';
import { AccountController } from './controller/account.controller';
import { JwtService } from 'src/shared/jwt/jwt';

@Module({
  providers: [AccountService, JwtService],
  controllers: [AccountController],
})
export class AccountModule {}
