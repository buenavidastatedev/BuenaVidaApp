import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Stock } from './entities/stock.entity';
import { StockMovement, MovementType } from './entities/stock-movement.entity';
import { Product } from '../products/entities/product.entity';
import { Winery } from '../wineries/entities/winery.entity';
import { CreateStockDto } from './dto/create-stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepo: Repository<Stock>,

    @InjectRepository(StockMovement)
    private readonly movementRepo: Repository<StockMovement>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Winery)
    private readonly wineryRepo: Repository<Winery>,
  ) {}

  async create(dto: CreateStockDto): Promise<Stock> {
    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
      relations: ['winery'],
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${dto.productId} no encontrado`);
    }

    const winery = await this.wineryRepo.findOne({
      where: { id: dto.wineryId },
    });

    if (!winery) {
      throw new NotFoundException(`Bodega con id ${dto.wineryId} no encontrada`);
    }

    if (product.winery.id !== winery.id) {
      throw new BadRequestException(
        'El producto no pertenece a la bodega indicada',
      );
    }

    const existingStock = await this.stockRepo.findOne({
      where: {
        product: { id: product.id },
        winery: { id: winery.id },
      },
    });

    if (existingStock) {
      throw new ConflictException(
        'Ya existe un registro de stock para este producto en esta bodega',
      );
    }

    const stock = this.stockRepo.create({
      product,
      winery,
      quantity: dto.quantity,
      minStock: dto.minStock ?? 20,
    });

    return await this.stockRepo.save(stock);
  }

  async findAll(): Promise<Stock[]> {
    return await this.stockRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Stock> {
    const stock = await this.stockRepo.findOne({
      where: { id },
    });

    if (!stock) {
      throw new NotFoundException(`Stock con id ${id} no encontrado`);
    }

    return stock;
  }

  async moveStock(
    stockId: string,
    quantity: number,
    type: MovementType,
    reason?: string,
  ): Promise<Stock> {
    const stock = await this.stockRepo.findOne({
      where: { id: stockId },
    });

    if (!stock) {
      throw new NotFoundException('Stock no encontrado');
    }

    if (quantity <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor a 0');
    }

    if (type === MovementType.OUT && stock.quantity < quantity) {
      throw new BadRequestException('Stock insuficiente');
    }

    stock.quantity =
      type === MovementType.IN
        ? stock.quantity + quantity
        : stock.quantity - quantity;

    await this.stockRepo.save(stock);

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