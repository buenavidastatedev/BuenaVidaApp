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

import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

import { Roles } from '../auth/decorators/auth.decorators';
import { UserRole } from '../users/enums/user.enum';

@ApiTags('Clients')
@ApiBearerAuth()
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Roles(UserRole.OWNER, UserRole.SELLER)
  @Post()
  @ApiOperation({
    summary: 'Crear cliente',
    description:
      'Crea un cliente asociado a un usuario existente. Opcionalmente puede asignarse a un vendedor. Requiere rol OWNER o SELLER.',
  })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({
    status: 201,
    description: 'Cliente creado correctamente.',
    type: Client,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario o vendedor no encontrado.',
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Roles(UserRole.OWNER, UserRole.SELLER)
  @Get()
  @ApiOperation({
    summary: 'Listar clientes',
    description:
      'Obtiene todos los clientes con sus relaciones: usuario, vendedor y pedidos. Requiere rol OWNER o SELLER.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes obtenida correctamente.',
    type: [Client],
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
  })
  findAll() {
    return this.clientsService.findAll();
  }

  @Roles(UserRole.OWNER, UserRole.SELLER, UserRole.CLIENT)
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener cliente por ID',
    description:
      'Busca un cliente específico por su ID. Requiere rol OWNER, SELLER o CLIENT.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del cliente',
    example: '7dff0d4d-53e8-4b67-9a6f-899a37f2b6b1',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado correctamente.',
    type: Client,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Roles(UserRole.OWNER, UserRole.SELLER)
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar cliente',
    description:
      'Actualiza los datos de un cliente existente. También permite cambiar el usuario o vendedor asociado. Requiere rol OWNER o SELLER.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del cliente',
    example: '7dff0d4d-53e8-4b67-9a6f-899a37f2b6b1',
  })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({
    status: 200,
    description: 'Cliente actualizado correctamente.',
    type: Client,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente, usuario o vendedor no encontrado.',
  })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Roles(UserRole.OWNER)
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar cliente',
    description: 'Elimina un cliente por ID. Requiere rol OWNER.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del cliente',
    example: '7dff0d4d-53e8-4b67-9a6f-899a37f2b6b1',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente eliminado correctamente.',
    schema: {
      example: {
        message:
          'Client with id 7dff0d4d-53e8-4b67-9a6f-899a37f2b6b1 deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}