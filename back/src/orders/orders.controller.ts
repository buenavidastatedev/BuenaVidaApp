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

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Public } from '../auth/decorators/auth.decorators';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Crear orden',
    description:
      'Crea una orden para un cliente. Valida stock, descuenta stock y genera los items de la orden. Todos los productos deben pertenecer a la misma bodega.',
  })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({
    status: 201,
    description: 'Orden creada correctamente.',
    type: Order,
  })
  @ApiResponse({
    status: 400,
    description:
      'Stock insuficiente, producto sin bodega o productos de distintas bodegas.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente o producto no encontrado.',
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Listar órdenes',
    description:
      'Obtiene todas las órdenes con cliente, items y productos asociados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de órdenes obtenida correctamente.',
    type: [Order],
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener orden por ID',
    description: 'Busca una orden específica por su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID de la orden',
    example: 'e21fa2fb-5e46-4f46-944e-bfb334f7c4cc',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden encontrada correctamente.',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada.',
  })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar orden',
    description:
      'Actualiza datos de una orden. Principalmente útil para cambiar el estado.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID de la orden',
    example: 'e21fa2fb-5e46-4f46-944e-bfb334f7c4cc',
  })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({
    status: 200,
    description: 'Orden actualizada correctamente.',
    type: Order,
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada.',
  })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Public()
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar orden',
    description: 'Elimina una orden por ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID de la orden',
    example: 'e21fa2fb-5e46-4f46-944e-bfb334f7c4cc',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden eliminada correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada.',
  })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}