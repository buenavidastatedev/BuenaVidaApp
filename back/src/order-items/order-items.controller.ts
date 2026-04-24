import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { Public } from '../auth/decorators/auth.decorators';

@ApiTags('Order Items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Crear item de orden',
    description:
      'Crea manualmente un item asociado a una orden y un producto. En el flujo normal, los items se crean desde POST /orders.',
  })
  @ApiBody({ type: CreateOrderItemDto })
  @ApiResponse({
    status: 201,
    description: 'Item de orden creado correctamente.',
    type: OrderItem,
  })
  @ApiResponse({
    status: 404,
    description: 'Orden o producto no encontrado.',
  })
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Listar items de órdenes',
    description: 'Obtiene todos los items de órdenes con su orden y producto.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de items obtenida correctamente.',
    type: [OrderItem],
  })
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener item por ID',
    description: 'Busca un item de orden específico por su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del item de orden.',
    example: '7f155bb8-467c-4c8e-9c5e-bf3d21f4f917',
  })
  @ApiResponse({
    status: 200,
    description: 'Item encontrado correctamente.',
    type: OrderItem,
  })
  @ApiResponse({
    status: 404,
    description: 'Item no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.orderItemsService.findOne(id);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar item de orden',
    description:
      'Actualiza cantidad, precio, producto u orden asociada de un item.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del item de orden.',
    example: '7f155bb8-467c-4c8e-9c5e-bf3d21f4f917',
  })
  @ApiBody({ type: UpdateOrderItemDto })
  @ApiResponse({
    status: 200,
    description: 'Item actualizado correctamente.',
    type: OrderItem,
  })
  @ApiResponse({
    status: 404,
    description: 'Item, orden o producto no encontrado.',
  })
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(id, updateOrderItemDto);
  }

  @Public()
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar item de orden',
    description: 'Elimina un item de orden por ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del item de orden.',
    example: '7f155bb8-467c-4c8e-9c5e-bf3d21f4f917',
  })
  @ApiResponse({
    status: 200,
    description: 'Item eliminado correctamente.',
    schema: {
      example: {
        message:
          'OrderItem with id 7f155bb8-467c-4c8e-9c5e-bf3d21f4f917 deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Item no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.orderItemsService.remove(id);
  }
}