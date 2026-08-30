import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from '../service/dashboard.service';
import { AuthGuard } from 'src/shared/guard/auth';
import type { Request } from 'express';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async dashboard(@Req() request: Request) {
    const userId = request.user.userId;
    const dasboardData = await this.dashboardService.getDashboard(userId);
    return {
      statuscode: HttpStatus.OK,
      message: 'Dashboard retrieved successfully',
      data: dasboardData,
    };
  }
}
