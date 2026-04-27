import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StockService } from './stock.service';
import { StockController } from './stock.controller';

import { Stock } from './entities/stock.entity';
import { StockMovement } from './entities/stock-movement.entity';
import { Product } from 'src/products/entities/product.entity';
import { Winery } from 'src/wineries/entities/winery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, StockMovement,Product,Winery])],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService], 
})
export class StockModule {}
