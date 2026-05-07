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
  ApiBearerAuth,
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
import { Roles } from '../auth/decorators/auth.decorators';
import { UserRole } from '../users/enums/user.enum';

@ApiTags('Sellers')
@ApiBearerAuth()
@Controller('sellers')
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Roles(UserRole.OWNER)
  @Post()
  @ApiOperation({
    summary: 'Crear vendedor',
    description:
      'Crea un perfil de vendedor asociado a un usuario existente. Un usuario solo puede tener un perfil de vendedor. Requiere rol OWNER.',
  })
  @ApiBody({ type: CreateSellerDto })
  @ApiResponse({
    status: 201,
    description: 'Vendedor creado correctamente.',
    type: Seller,
  })
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(createSellerDto);
  }

  @Roles(UserRole.OWNER, UserRole.SELLER)
  @Get()
  @ApiOperation({
    summary: 'Listar vendedores',
    description:
      'Obtiene todos los vendedores con sus relaciones: usuario, clientes y pedidos. Requiere rol OWNER o SELLER.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de vendedores obtenida correctamente.',
    type: [Seller],
  })
  findAll() {
    return this.sellersService.findAll();
  }

  @Roles(UserRole.OWNER, UserRole.SELLER)
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener vendedor por ID',
    description:
      'Busca un vendedor específico por su ID. Requiere rol OWNER o SELLER.',
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
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(id);
  }

  @Roles(UserRole.OWNER)
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar vendedor',
    description:
      'Actualiza el usuario asociado a un vendedor. El nuevo usuario no debe tener otro perfil de vendedor. Requiere rol OWNER.',
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
  update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Roles(UserRole.OWNER)
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar vendedor',
    description:
      'Realiza un soft delete de un vendedor por ID. Requiere rol OWNER.',
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
  remove(@Param('id') id: string) {
    return this.sellersService.remove(id);
  }

  @Roles(UserRole.OWNER)
  @Patch(':id/restore')
  @ApiOperation({
    summary: 'Restaurar vendedor eliminado',
    description:
      'Restaura un vendedor eliminado con soft delete. Requiere rol OWNER.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del vendedor',
    example: '9f375f53-66f2-4a71-a1e3-11f9d17c987a',
  })
  @ApiResponse({
    status: 200,
    description: 'Vendedor restaurado correctamente.',
    schema: {
      example: {
        message:
          'Seller with id 9f375f53-66f2-4a71-a1e3-11f9d17c987a restored successfully',
      },
    },
  })
  restore(@Param('id') id: string) {
    return this.sellersService.restore(id);
  }
}