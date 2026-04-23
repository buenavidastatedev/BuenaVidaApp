import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';

import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import { OrderStatus } from 'src/common/decorators/guards/filters/interceptors/enums/order-status.enum';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Stock)
    private readonly stockRepo: Repository<Stock>,
  ) {}

  async getSummary() {
    const [orders, products, lowStock] = await Promise.all([
      this.orderRepo.find(),
      this.productRepo.find(),
      this.stockRepo.find({
        where: {
          quantity: LessThan(20),
        },
      }),
    ]);

    const totalSales = orders.reduce((acc, o) => acc + Number(o.total), 0);

    const ordersCount = orders.length;

    // 🔥 promedio por orden
    const avgOrderValue = ordersCount > 0 ? totalSales / ordersCount : 0;

    // 🔥 órdenes pendientes (ajustar según tu entity)
    const pendingOrders = orders.filter(
      (o) => o.status === OrderStatus.PENDING,
    ).length;

    return {
      totalSales,
      ordersCount,
      productsCount: products.length,
      lowStockCount: lowStock.length,
      avgOrderValue,
      pendingOrders,
    };
  }
  async getLowStock() {
    return this.stockRepo.find({
      where: {
        quantity: LessThan(20),
      },
      relations: ['product'],
    });
  }

  async getTopClients() {
    const orders = await this.orderRepo.find({
      relations: ['client'],
    });

    const map = new Map<string, number>();

    for (const order of orders) {
      const name = order.client?.name || 'Sin nombre';

      const current = map.get(name) || 0;

      map.set(name, current + Number(order.total));
    }

    return Array.from(map.entries())
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }

  async getAlerts() {
    const pendingOrders = await this.orderRepo.count({
      where: { status: OrderStatus.PENDING },
    });

    const lowStock = await this.stockRepo.count({
      where: { quantity: LessThan(20) },
    });

    return {
      pendingOrders,
      lowStock,
    };
  }
  async getWinerySettlements() {
    const orders = await this.orderRepo.find({
      relations: ['winery'],
    });

    const grouped: Record<string, number> = {};

    for (const order of orders) {
      const winery = order.winery?.name || 'Sin bodega';

      if (!grouped[winery]) {
        grouped[winery] = 0;
      }

      grouped[winery] += Number(order.total ?? 0);
    }

    return Object.entries(grouped).map(([name, total]) => {
      const commission = total * 0.05; // ajustable
      const iva = total * 0.19;

      return {
        winery: name,
        gross: total,
        commission,
        iva,
        net: total - commission - iva,
      };
    });
  }

  async getSellerPerformance() {
    const orders = await this.orderRepo.find({
      relations: ['seller', 'seller.user'],
    });

    const map = new Map<string, number>();
    let total = 0;

    for (const order of orders) {
      const sellerName = order.seller?.user?.firstname ?? 'Sin vendedor';

      const current = map.get(sellerName) ?? 0;

      const value = Number(order.total ?? 0);

      map.set(sellerName, current + value);
      total += value;
    }

    return Array.from(map.entries()).map(([name, value]) => ({
      name,
      percentage: total > 0 ? Number(((value / total) * 100).toFixed(1)) : 0,
    }));
  }
}
