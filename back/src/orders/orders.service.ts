import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { OrderItem } from '../order-items/entities/order-item.entity';
import { Product } from '../products/entities/product.entity';
import { Client } from '../clients/entities/client.entity';
import { Seller } from '../sellers/entities/seller.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { clientId, sellerId, items } = createOrderDto;

    const client = await this.clientRepository.findOne({
      where: { id: clientId },
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${clientId} not found`);
    }

    let seller: Seller | null = null;

    if (sellerId) {
      seller = await this.sellerRepository.findOne({
        where: { id: sellerId },
      });

      if (!seller) {
        throw new NotFoundException(`Seller with id ${sellerId} not found`);
      }
    }

    const orderItems: OrderItem[] = [];
    let total = 0;

    for (const item of items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }

      const orderItem = this.orderItemRepository.create({
        product,
        quantity: item.quantity,
        price: Number(product.price),
      });

      total += Number(product.price) * item.quantity;
      orderItems.push(orderItem);
    }

    const order = this.orderRepository.create({
      client,
      seller,
      total,
      items: orderItems,
    });

    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['client', 'seller', 'items', 'items.product', 'invoice'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['client', 'seller', 'items', 'items.product', 'invoice'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (updateOrderDto.clientId) {
      const client = await this.clientRepository.findOne({
        where: { id: updateOrderDto.clientId },
      });

      if (!client) {
        throw new NotFoundException(
          `Client with id ${updateOrderDto.clientId} not found`,
        );
      }

      order.client = client;
    }

    if (updateOrderDto.sellerId) {
      const seller = await this.sellerRepository.findOne({
        where: { id: updateOrderDto.sellerId },
      });

      if (!seller) {
        throw new NotFoundException(
          `Seller with id ${updateOrderDto.sellerId} not found`,
        );
      }

      order.seller = seller;
    }

    if (updateOrderDto.status !== undefined) {
      order.status = updateOrderDto.status;
    }

    return await this.orderRepository.save(order);
  }

  async remove(id: string): Promise<{ message: string }> {
    const order = await this.findOne(id);

    await this.orderRepository.remove(order);

    return {
      message: `Order with id ${id} deleted successfully`,
    };
  }

  async findItemsByOrder(id: string): Promise<OrderItem[]> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order.items;
  }
}