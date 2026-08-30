import { Module } from '@nestjs/common';
import { DashboardController } from './controller/dashboard.controller';
import { DashboardService } from './service/dashboard.service';
import { DashboardRepository } from './repository/dashoard.repository';
import { JwtService } from 'src/shared/jwt/jwt';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository, JwtService],
})
export class DashboardModule {}
