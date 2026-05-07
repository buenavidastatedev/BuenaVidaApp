import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt.auth.guard';

import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { SellersModule } from './sellers/sellers.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { InvoicesModule } from './invoices/invoices.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WineriesModule } from './wineries/wineries.module';
import { StockModule } from './stock/stock.module';
import { SettlementConfigModule } from './settlement-config/settlement-config.module';

@Module({
  imports: [
    // ── Configuración global (.env) ──────────────────────────
    ConfigModule.forRoot({
      isGlobal: true, // disponible en todos los módulos sin reimportar
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 10, // 10 requests per minute
      },
    ]),

    // ── Rate limiting ────────────────────────────────────────
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minuto
        limit: 10, // 10 requests por minuto
      },
    ]),
    // ── Base de datos ────────────────────────────────────────
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService): TypeOrmModuleOptions => {
        const isDev = cfg.get<string>('NODE_ENV') === 'development';

        return {
          type: 'mysql',
          url: cfg.get<string>('DATABASE_URL'),

          entities: [__dirname + '/**/*.entity{.ts,.js}'],

          // 🔥 IMPORTANTE
          synchronize: true,
          dropSchema: false,

          // logs solo en dev
          logging: isDev,

          // migraciones
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          migrationsRun: true,

          // opcional pero recomendado en Railway/MySQL cloud
          ssl: isDev ? false : { rejectUnauthorized: false },
        };
      },
    }),

    // ── Módulos de la app ────────────────────────────────────
    AuthModule,
    UsersModule,
    ClientsModule,
    ConfigModule,
    SellersModule,
    ProductsModule,
    OrdersModule,
    OrderItemsModule,
    InvoicesModule,
    DashboardModule,
    WineriesModule,
    StockModule,
    SettlementConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // JwtAuthGuard global: todas las rutas requieren JWT
    // excepto las marcadas con @Public()
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Rate limiting global
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
