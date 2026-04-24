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

import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Seller } from './entities/seller.entity';
import { Public } from '../auth/decorators/auth.decorators';

@ApiTags('Sellers')
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Crear vendedor',
    description:
      'Crea un perfil de vendedor asociado a un usuario existente. Un usuario solo puede tener un perfil de vendedor.',
  })
  @ApiBody({ type: CreateSellerDto })
  @ApiResponse({
    status: 201,
    description: 'Vendedor creado correctamente.',
    type: Seller,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado.',
  })
  @ApiResponse({
    status: 409,
    description: 'El usuario ya tiene un perfil de vendedor.',
  })
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(createSellerDto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Listar vendedores',
    description:
      'Obtiene todos los vendedores con sus relaciones: usuario, clientes y pedidos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de vendedores obtenida correctamente.',
    type: [Seller],
  })
  findAll() {
    return this.sellersService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener vendedor por ID',
    description: 'Busca un vendedor específico por su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del vendedor',
    example: '9f375f53-66f2-4a71-a1e3-11f9d17c987a',
  })
  @ApiResponse({
    status: 200,
    description: 'Vendedor encontrado correctamente.',
    type: Seller,
  })
  @ApiResponse({
    status: 404,
    description: 'Vendedor no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(id);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar vendedor',
    description:
      'Actualiza el usuario asociado a un vendedor. El nuevo usuario no debe tener otro perfil de vendedor.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del vendedor',
    example: '9f375f53-66f2-4a71-a1e3-11f9d17c987a',
  })
  @ApiBody({ type: UpdateSellerDto })
  @ApiResponse({
    status: 200,
    description: 'Vendedor actualizado correctamente.',
    type: Seller,
  })
  @ApiResponse({
    status: 404,
    description: 'Vendedor o usuario no encontrado.',
  })
  @ApiResponse({
    status: 409,
    description: 'El usuario ya tiene un perfil de vendedor.',
  })
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Public()
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar vendedor',
    description: 'Elimina un vendedor por ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del vendedor',
    example: '9f375f53-66f2-4a71-a1e3-11f9d17c987a',
  })
  @ApiResponse({
    status: 200,
    description: 'Vendedor eliminado correctamente.',
    schema: {
      example: {
        message:
          'Seller with id 9f375f53-66f2-4a71-a1e3-11f9d17c987a deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Vendedor no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.sellersService.remove(id);
  }
}