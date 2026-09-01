import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './db/prisma.module';
import { AccountModule } from './account/account.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './shared/exception/global.exception-handler';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportModule } from './report/report.module';
import { RepostController } from './repost/repost.controller';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    PrismaModule,
    AccountModule,
    CategoryModule,
    TransactionModule,
    DashboardModule,
    ReportModule,
  ],
  controllers: [RepostController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    Logger,
  ],
})
export class AppModule {}
