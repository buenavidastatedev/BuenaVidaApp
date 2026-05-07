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

import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { Roles } from '../auth/decorators/auth.decorators';
import { UserRole } from '../users/enums/user.enum';

@ApiTags('Invoices')
@ApiBearerAuth()
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Roles(UserRole.OWNER, UserRole.SELLER)
  @Post()
  @ApiOperation({
    summary: 'Crear comprobante',
    description:
      'Crea un comprobante asociado a una orden. Puede ser presupuesto o remito. Una orden solo puede tener un comprobante. Requiere rol OWNER o SELLER.',
  })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({
    status: 201,
    description: 'Comprobante creado correctamente.',
    type: Invoice,
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
    description: 'Orden no encontrada.',
  })
  @ApiResponse({
    status: 409,
    description: 'La orden ya tiene un comprobante asociado.',
  })
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Roles(UserRole.OWNER, UserRole.SELLER)
  @Get()
  @ApiOperation({
    summary: 'Listar comprobantes',
    description:
      'Obtiene todos los comprobantes con su orden asociada. Requiere rol OWNER o SELLER.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de comprobantes obtenida correctamente.',
    type: [Invoice],
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
    return this.invoicesService.findAll();
  }

  @Roles(UserRole.OWNER, UserRole.SELLER, UserRole.CLIENT)
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener comprobante por ID',
    description:
      'Busca un comprobante específico por su ID. Requiere rol OWNER, SELLER o CLIENT.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del comprobante.',
    example: 'd24e957f-2f46-43b7-a7ed-296a72ef3a4e',
  })
  @ApiResponse({
    status: 200,
    description: 'Comprobante encontrado correctamente.',
    type: Invoice,
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
    description: 'Comprobante no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Roles(UserRole.OWNER, UserRole.SELLER)
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar comprobante',
    description:
      'Actualiza el tipo, total u orden asociada al comprobante. Si se cambia la orden, esa orden no debe tener ya otro comprobante. Requiere rol OWNER o SELLER.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del comprobante.',
    example: 'd24e957f-2f46-43b7-a7ed-296a72ef3a4e',
  })
  @ApiBody({ type: UpdateInvoiceDto })
  @ApiResponse({
    status: 200,
    description: 'Comprobante actualizado correctamente.',
    type: Invoice,
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
    description: 'Comprobante u orden no encontrada.',
  })
  @ApiResponse({
    status: 409,
    description: 'La orden ya tiene otro comprobante asociado.',
  })
  update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Roles(UserRole.OWNER)
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar comprobante',
    description: 'Elimina un comprobante por ID. Requiere rol OWNER.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del comprobante.',
    example: 'd24e957f-2f46-43b7-a7ed-296a72ef3a4e',
  })
  @ApiResponse({
    status: 200,
    description: 'Comprobante eliminado correctamente.',
    schema: {
      example: {
        message:
          'Invoice with id d24e957f-2f46-43b7-a7ed-296a72ef3a4e deleted successfully',
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
    description: 'Comprobante no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }
}