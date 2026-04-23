import { Controller, Post, Body } from '@nestjs/common';
import { StockService } from './stock.service';
import { MovementType } from './entities/stock-movement.entity';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('move')
  moveStock(
    @Body('stockId') stockId: string,
    @Body('quantity') quantity: number,
    @Body('type') type: MovementType,
    @Body('reason') reason?: string,
  ) {
    return this.stockService.moveStock(stockId, quantity, type, reason);
  }
}
