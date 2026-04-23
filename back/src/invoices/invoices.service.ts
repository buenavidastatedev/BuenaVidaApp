import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Invoice } from './entities/invoice.entity';
import { Order } from '../orders/entities/order.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const { orderId, ...invoiceData } = createInvoiceDto;

    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: ['invoice'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    if (order.invoice) {
      throw new ConflictException(
        `Order with id ${orderId} already has an invoice`,
      );
    }

    const invoice = this.invoiceRepository.create({
      ...invoiceData,
      order,
    });

    return await this.invoiceRepository.save(invoice);
  }

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepository.find({
      relations: ['order'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['order'],
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with id ${id} not found`);
    }

    return invoice;
  }

  async update(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    const invoice = await this.findOne(id);

    if (updateInvoiceDto.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: updateInvoiceDto.orderId },
        relations: ['invoice'],
      });

      if (!order) {
        throw new NotFoundException(
          `Order with id ${updateInvoiceDto.orderId} not found`,
        );
      }

      if (order.invoice && order.invoice.id !== invoice.id) {
        throw new ConflictException(
          `Order with id ${updateInvoiceDto.orderId} already has an invoice`,
        );
      }

      invoice.order = order;
    }

    if (updateInvoiceDto.type !== undefined) {
      invoice.type = updateInvoiceDto.type;
    }

    if (updateInvoiceDto.total !== undefined) {
      invoice.total = updateInvoiceDto.total;
    }

    return await this.invoiceRepository.save(invoice);
  }

  async remove(id: string): Promise<{ message: string }> {
    const invoice = await this.findOne(id);

    await this.invoiceRepository.remove(invoice);

    return {
      message: `Invoice with id ${id} deleted successfully`,
    };
  }
}