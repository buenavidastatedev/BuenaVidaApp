import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { SellersModule } from './sellers/sellers.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { InvoicesModule } from './invoices/invoices.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [UsersModule, AuthModule, ClientsModule, SellersModule, ProductsModule, OrdersModule, OrderItemsModule, InvoicesModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
