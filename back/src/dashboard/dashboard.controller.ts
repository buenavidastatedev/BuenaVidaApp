import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @Get('summary')
  getSummary() {
    return this.dashboardService.getSummary();
  }

  @Get('stock-alerts')
  getLowStock() {
    return this.dashboardService.getLowStock();
  }

  @Get('alerts')
  getAlerts() {
    return this.dashboardService.getAlerts();
  }

  @Get('settlements')
  getSettlements() {
    return this.dashboardService.getWinerySettlements();
  }

  @Get('top-clients')
  getTopClients() {
    return this.dashboardService.getTopClients();
  }

  @Get('sellers')
  getSellers() {
    return this.dashboardService.getSellerPerformance();
  }
}
