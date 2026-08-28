import { Module } from '@nestjs/common';
import { TransactionService } from './service/transaction.service';
import { TransactionController } from './controller/transaction.controller';
import { TransactionRepository } from './repository/transaction.repository';
import { JwtService } from 'src/shared/jwt/jwt';
import { AuthGuard } from 'src/shared/guard/auth';

@Module({
  providers: [TransactionService, TransactionRepository, JwtService, AuthGuard],
  controllers: [TransactionController],
})
export class TransactionModule {}
