import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { StockService } from './stock.service';
import { Stock } from './entities/stock.entity';
import { CreateStockDto } from './dto/create-stock.dto';
import { MoveStockDto } from './dto/move-stock.dto';
import { Public } from '../auth/decorators/auth.decorators';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  // ─── Crear stock inicial ─────────────────────────────

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Crear stock inicial',
    description:
      'Crea el registro inicial de stock para un producto en una bodega.',
  })
  @ApiBody({ type: CreateStockDto })
  @ApiResponse({
    status: 201,
    description: 'Stock creado correctamente.',
    type: Stock,
  })
  create(@Body() dto: CreateStockDto) {
    return this.stockService.create(dto);
  }

  // ─── Listar stock ────────────────────────────────────

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Listar stock',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de stock',
    type: [Stock],
  })
  findAll() {
    return this.stockService.findAll();
  }

  // ─── Obtener stock por id ────────────────────────────

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener stock por ID',
  })
  @ApiParam({
    name: 'id',
    example: 'uuid-del-stock',
  })
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }

  // ─── Mover stock (CORREGIDO) ─────────────────────────

  @Public()
  @Post('move')
  @ApiOperation({
    summary: 'Mover stock',
    description: 'IN suma stock, OUT descuenta stock.',
  })
  @ApiBody({ type: MoveStockDto })
  @ApiResponse({
    status: 201,
    description: 'Movimiento realizado correctamente',
    type: Stock,
  })
  moveStock(@Body() dto: MoveStockDto) {
    return this.stockService.moveStock(
      dto.stockId,
      dto.quantity,
      dto.type,
      dto.reason,
    );
  }
}