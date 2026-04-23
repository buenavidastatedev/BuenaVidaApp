import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItem } from './entities/order-item.entity';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const { orderId, productId, quantity, price } = createOrderItemDto;

    const order = await this.orderRepository.findOne({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    const orderItem = this.orderItemRepository.create({
      order,
      product,
      quantity,
      price,
    });

    return await this.orderItemRepository.save(orderItem);
  }

  async findAll(): Promise<OrderItem[]> {
    return await this.orderItemRepository.find({
      relations: ['order', 'product'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id },
      relations: ['order', 'product'],
    });

    if (!orderItem) {
      throw new NotFoundException(`OrderItem with id ${id} not found`);
    }

    return orderItem;
  }

  async update(
    id: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    const orderItem = await this.findOne(id);

    if (updateOrderItemDto.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: updateOrderItemDto.orderId },
      });

      if (!order) {
        throw new NotFoundException(
          `Order with id ${updateOrderItemDto.orderId} not found`,
        );
      }

      orderItem.order = order;
    }

    if (updateOrderItemDto.productId) {
      const product = await this.productRepository.findOne({
        where: { id: updateOrderItemDto.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with id ${updateOrderItemDto.productId} not found`,
        );
      }

      orderItem.product = product;
    }

    if (updateOrderItemDto.quantity !== undefined) {
      orderItem.quantity = updateOrderItemDto.quantity;
    }

    if (updateOrderItemDto.price !== undefined) {
      orderItem.price = updateOrderItemDto.price;
    }

    return await this.orderItemRepository.save(orderItem);
  }

  async remove(id: string): Promise<{ message: string }> {
    const orderItem = await this.findOne(id);

    await this.orderItemRepository.remove(orderItem);

    return {
      message: `OrderItem with id ${id} deleted successfully`,
    };
  }
}
