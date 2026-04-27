import { Controller, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { DashboardService } from './dashboard.service';
import { Public } from '../auth/decorators/auth.decorators';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Public()
  @Get('summary')
  @ApiOperation({
    summary: 'Resumen general del dashboard',
    description:
      'Devuelve métricas generales: ventas totales, cantidad de órdenes, productos, stock bajo, promedio por orden y órdenes pendientes.',
  })
  @ApiResponse({
    status: 200,
    description: 'Resumen obtenido correctamente.',
    schema: {
      example: {
        totalSales: 125000,
        ordersCount: 10,
        productsCount: 25,
        lowStockCount: 3,
        avgOrderValue: 12500,
        pendingOrders: 4,
      },
    },
  })
  getSummary() {
    return this.dashboardService.getSummary();
  }

  @Public()
  @Get('stock-alerts')
  @ApiOperation({
    summary: 'Alertas de stock bajo',
    description:
      'Devuelve productos cuyo stock está por debajo del umbral definido actualmente como menor a 20 unidades.',
  })
  @ApiResponse({
    status: 200,
    description: 'Alertas de stock obtenidas correctamente.',
    schema: {
      example: [
        {
          id: 'uuid-stock',
          quantity: 10,
          minStock: 20,
          product: {
            id: 'uuid-product',
            name: 'Malbec Reserva',
            price: 12500.5,
          },
        },
      ],
    },
  })
  getLowStock() {
    return this.dashboardService.getLowStock();
  }

  @Public()
  @Get('alerts')
  @ApiOperation({
    summary: 'Alertas generales',
    description:
      'Devuelve cantidad de órdenes pendientes y cantidad de registros con stock bajo.',
  })
  @ApiResponse({
    status: 200,
    description: 'Alertas obtenidas correctamente.',
    schema: {
      example: {
        pendingOrders: 4,
        lowStock: 3,
      },
    },
  })
  getAlerts() {
    return this.dashboardService.getAlerts();
  }

  @Public()
  @Get('settlements')
  @ApiOperation({
    summary: 'Liquidaciones por bodega',
    description:
      'Agrupa ventas por bodega y calcula bruto, comisión, IVA y neto estimado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Liquidaciones obtenidas correctamente.',
    schema: {
      example: [
        {
          winery: 'Catena Zapata',
          gross: 100000,
          commission: 5000,
          iva: 19000,
          net: 76000,
        },
      ],
    },
  })
  getSettlements() {
    return this.dashboardService.getWinerySettlements();
  }

  @Public()
  @Get('top-clients')
  @ApiOperation({
    summary: 'Top clientes',
    description:
      'Devuelve los 5 clientes con mayor monto acumulado en órdenes.',
  })
  @ApiResponse({
    status: 200,
    description: 'Top clientes obtenido correctamente.',
    schema: {
      example: [
        {
          name: 'Vinoteca Don Julio',
          total: 85000,
        },
      ],
    },
  })
  getTopClients() {
    return this.dashboardService.getTopClients();
  }

  @Public()
  @Get('sellers')
  @ApiOperation({
    summary: 'Rendimiento de vendedores',
    description:
      'Calcula el porcentaje de ventas correspondiente a cada vendedor según el total vendido.',
  })
  @ApiResponse({
    status: 200,
    description: 'Rendimiento de vendedores obtenido correctamente.',
    schema: {
      example: [
        {
          name: 'Sasha',
          percentage: 45.5,
        },
      ],
    },
  })
  getSellers() {
    return this.dashboardService.getSellerPerformance();
  }
}