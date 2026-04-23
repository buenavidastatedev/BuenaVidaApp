import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { Client } from '../clients/entities/client.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { Stock } from '../stock/entities/stock.entity';
import { StockService } from '../stock/stock.service';
import { MovementType } from 'src/stock/enum/movement-type.enum';
import { OrderStatus } from 'src/common/decorators/guards/filters/interceptors/enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,

    @InjectRepository(Stock)
    private readonly stockRepo: Repository<Stock>,

    private readonly stockService: StockService,
  ) {}

  async create(dto: CreateOrderDto) {
    const client = await this.clientRepo.findOne({
      where: { id: dto.clientId },
    });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const order = this.orderRepo.create({
      client,
      status: OrderStatus.PENDING,
    });

    let total = 0;

    const items: OrderItem[] = [];

    for (const item of dto.items) {
      const product = await this.productRepo.findOne({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(`Producto ${item.productId} no encontrado`);
      }

      const stock = await this.stockRepo.findOne({
        where: { product: { id: product.id } },
        relations: ['product'],
      });

      if (!stock || stock.quantity < item.quantity) {
        throw new BadRequestException(
          `Stock insuficiente para ${product.name}`,
        );
      }

      // calcular total
      total += Number(product.price) * item.quantity;

      // mover stock
      await this.stockService.moveStock(
        stock.id,
        item.quantity,
        MovementType.OUT,
        'Order',
      );

      const orderItem = this.orderItemRepo.create({
        product,
        quantity: item.quantity,
        price: product.price,
      });

      items.push(orderItem);
    }

    order.total = total;
    order.items = items;

    return this.orderRepo.save(order);
  }

  async findAll() {
    return this.orderRepo.find({
      relations: ['client', 'items', 'items.product'],
    });
  }

  async findOne(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['client', 'items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException('Orden no encontrada');
    }

    return order;
  }

  async update(id: string, dto: UpdateOrderDto) {
    const order = await this.findOne(id);

    Object.assign(order, dto);

    return this.orderRepo.save(order);
  }

  async remove(id: string) {
    const order = await this.findOne(id);
    return this.orderRepo.remove(order);
  }
}