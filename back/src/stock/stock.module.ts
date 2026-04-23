import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockService } from './stock.service';
import { StockController } from './stock.controller';

import { Stock } from './entities/stock.entity';
import { StockMovement } from './entities/stock-movement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, StockMovement])],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService], // 👈 importante si lo usas en otros módulos
})
export class StockModule {}
