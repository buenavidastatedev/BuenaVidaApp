import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { Client } from '../clients/entities/client.entity';
import { Seller } from '../sellers/entities/seller.entity';


import { Order } from './entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';

import { Product } from '../products/entities/product.entity';
import { Client } from '../clients/entities/client.entity';
import { Stock } from '../stock/entities/stock.entity';

import { StockModule } from '../stock/stock.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Product, Client, Stock]),
    StockModule, // 🔥 ESTO ES LO QUE TE FALTA
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
