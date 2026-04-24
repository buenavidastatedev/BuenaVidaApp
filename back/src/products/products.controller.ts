import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Public } from '../auth/decorators/auth.decorators';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Crear producto/vino',
    description:
      'Crea un producto asociado a una bodega. El stock se maneja desde el módulo Stock.',
  })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Producto creado correctamente.',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Bodega no encontrada.',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Listar productos',
    description:
      'Obtiene todos los productos con su bodega y registros de stock asociados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida correctamente.',
    type: [Product],
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener producto por ID',
    description: 'Busca un producto específico por su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del producto',
    example: '75f4e79f-2178-4ef1-89c2-b2547f09e6f0',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado correctamente.',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Public()
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Subir imagen de producto',
    description:
      'Sube una imagen del producto/vino a Cloudinary y guarda la URL en imageUrl.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del producto',
    example: '75f4e79f-2178-4ef1-89c2-b2547f09e6f0',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Imagen subida correctamente.',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.uploadImage(id, file);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar producto',
    description:
      'Actualiza datos del producto. También permite cambiar la bodega asociada.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del producto',
    example: '75f4e79f-2178-4ef1-89c2-b2547f09e6f0',
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado correctamente.',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Producto o bodega no encontrada.',
  })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Public()
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar producto',
    description: 'Elimina un producto por ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID del producto',
    example: '75f4e79f-2178-4ef1-89c2-b2547f09e6f0',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado correctamente.',
    schema: {
      example: {
        message:
          'Product with id 75f4e79f-2178-4ef1-89c2-b2547f09e6f0 deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}