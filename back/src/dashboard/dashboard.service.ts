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

  async getTopProducts() {
    const products = await this.productRepo.find({
      relations: ['orderItems'],
    });

    return products
      .map((p) => ({
        product: p.name,
        sold: p.orderItems?.length ?? 0,
      }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);
  }
}
