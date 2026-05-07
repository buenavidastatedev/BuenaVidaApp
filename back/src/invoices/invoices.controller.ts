import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import * as PDFDocument from 'pdfkit';
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

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

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
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

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
  @Get(':id/pdf')
  @ApiOperation({
    summary: 'Generar PDF del comprobante',
    description:
      'Genera un PDF detallado del remito o presupuesto con información del cliente y productos.',
  })
  @ApiResponse({
    status: 200,
    description: 'PDF generado correctamente.',
  })
  async generatePdf(@Param('id') id: string, @Res() res: Response) {
    const invoice = await this.invoicesService.findOne(id);
    if (!invoice) throw new Error('Invoice not found');

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=remito-${id}.pdf`,
    );

    doc.pipe(res);

    // Header
    doc.fontSize(20).text('REMITO - BUENA VIDA', { align: 'center' });
    doc.moveDown();

    // Invoice details
    doc.fontSize(12).text(`Número de Remito: ${invoice.id}`, 50, 100);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 50, 120);
    doc.text(`Tipo: ${invoice.type}`, 50, 140);
    doc.moveDown();

    // Client info
    if (invoice.order?.client?.user) {
      const user = invoice.order.client.user;
      doc.text(`Cliente: ${user.firstname} ${user.lastname}`, 50, 180);
      doc.text(`Email: ${user.email}`, 50, 200);
    }
    doc.moveDown();

    // Products table
    doc.text('Productos:', 50, 240);
    let y = 260;
    if (invoice.order?.items) {
      invoice.order.items.forEach((item, index) => {
        doc.text(
          `${index + 1}. ${item.product?.name || 'Producto'} - Cantidad: ${item.quantity} - Precio: $${item.price}`,
          50,
          y,
        );
        y += 20;
      });
    }

    // Total
    doc.moveDown();
    doc.fontSize(14).text(`Total: $${invoice.total}`, { align: 'right' });

    doc.end();
  }
}
