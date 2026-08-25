import { Module } from '@nestjs/common';
import { AccountService } from './service/account.service';
import { AccountController } from './controller/account.controller';
import { jwtService } from 'src/shared/jwt/jwt';

@Module({
  providers: [AccountService, jwtService],
  controllers: [AccountController],
})
export class AccountModule {}
