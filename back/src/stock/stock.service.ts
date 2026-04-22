import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Stock } from './entities/stock.entity';
import { StockMovement, MovementType } from './entities/stock-movement.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepo: Repository<Stock>,

    @InjectRepository(StockMovement)
    private movementRepo: Repository<StockMovement>,
  ) {}

  async moveStock(
    stockId: string,
    quantity: number,
    type: MovementType,
    reason?: string,
  ) {
    const stock = await this.stockRepo.findOneBy({ id: stockId });

    if (!stock) throw new Error('Stock no encontrado');

    if (type === MovementType.OUT && stock.quantity < quantity) {
      throw new Error('Stock insuficiente');
    }

    // actualizar stock
    stock.quantity =
      type === MovementType.IN
        ? stock.quantity + quantity
        : stock.quantity - quantity;

    await this.stockRepo.save(stock);

    // registrar movimiento
    const movement = this.movementRepo.create({
      stock,
      quantity,
      type,
      reason,
    });

    await this.movementRepo.save(movement);

    return stock;
  }
}
