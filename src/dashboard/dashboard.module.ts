import { Module } from '@nestjs/common';
import { DashboardController } from './controller/dashboard.controller';
import { DashboardService } from './service/dashboard.service';
import { DashboardRepository } from './repository/dashoard.repository';
import { AuthGuard } from 'src/shared/guard/auth';

@Module({
  controllers: [DashboardController, DashboardRepository, AuthGuard],
  providers: [DashboardService],
})
export class DashboardModule {}
