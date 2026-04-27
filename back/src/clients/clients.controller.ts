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

import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { Public } from '../auth/decorators/auth.decorators';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Crear cliente',
    description:
      'Crea un cliente asociado a un usuario existente. Opcionalmente puede asignarse a un vendedor.',
  })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({
    status: 201,
    description: 'Cliente creado correctamente.',
    type: Client,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario o vendedor no encontrado.',
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Listar clientes',
    description:
      'Obtiene todos los clientes con sus relaciones: usuario, vendedor y pedidos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes obtenida correctamente.',
    type: [Client],
  })
  findAll() {
    return this.clientsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener cliente por ID',
    description: 'Busca un cliente específico por su ID.',
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
    status: 404,
    description: 'Cliente no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar cliente',
    description:
      'Actualiza los datos de un cliente existente. También permite cambiar el usuario o vendedor asociado.',
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
    status: 404,
    description: 'Cliente, usuario o vendedor no encontrado.',
  })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Public()
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar cliente',
    description: 'Elimina un cliente por ID.',
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
    status: 404,
    description: 'Cliente no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}