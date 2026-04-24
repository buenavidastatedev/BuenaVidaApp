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

import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { Public } from '../auth/decorators/auth.decorators';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Crear comprobante',
    description:
      'Crea un comprobante asociado a una orden. Puede ser presupuesto o remito. Una orden solo puede tener un comprobante.',
  })
  @ApiBody({ type: CreateInvoiceDto })
  @ApiResponse({
    status: 201,
    description: 'Comprobante creado correctamente.',
    type: Invoice,
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

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Listar comprobantes',
    description: 'Obtiene todos los comprobantes con su orden asociada.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de comprobantes obtenida correctamente.',
    type: [Invoice],
  })
  findAll() {
    return this.invoicesService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener comprobante por ID',
    description: 'Busca un comprobante específico por su ID.',
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
    status: 404,
    description: 'Comprobante no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar comprobante',
    description:
      'Actualiza el tipo, total u orden asociada al comprobante. Si se cambia la orden, esa orden no debe tener ya otro comprobante.',
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

  @Public()
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar comprobante',
    description: 'Elimina un comprobante por ID.',
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
    status: 404,
    description: 'Comprobante no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }
}