import { Module } from '@nestjs/common';
import { AccountService } from './service/account.service';
import { AccountController } from './controller/account.controller';
import { JwtService } from 'src/shared/jwt/jwt';
import { AccountRespository } from './repository/account.repository';

@Module({
  providers: [AccountService, JwtService, AccountRespository],
  controllers: [AccountController],
})
export class AccountModule {}
