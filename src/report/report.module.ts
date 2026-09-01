import { Module } from '@nestjs/common';
import { JwtService } from 'src/shared/jwt/jwt';
import { AuthGuard } from 'src/shared/guard/auth';
import { ReportRespository } from './repository/report.repository';
import { ReportController } from './controller/report.controller';
import { ReportService } from './service/report.service';

@Module({
  controllers: [ReportController, JwtService, AuthGuard, ReportRespository],
  providers: [ReportService],
})
export class ReportModule {}
