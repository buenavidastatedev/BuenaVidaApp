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
  ApiBearerAuth,
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
import { Roles } from '../auth/decorators/auth.decorators';
import { UserRole } from '../users/enums/user.enum';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(UserRole.OWNER, UserRole.WINERY)
  @Post()
  @ApiOperation({
    summary: 'Crear producto/vino',
    description:
      'Crea un producto asociado a una bodega. El stock se maneja desde el módulo Stock. Requiere rol OWNER o WINERY.',
  })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Producto creado correctamente.',
    type: Product,
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
    description: 'Bodega no encontrada.',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Roles(UserRole.OWNER, UserRole.WINERY, UserRole.SELLER, UserRole.CLIENT)
  @Get()
  @ApiOperation({
    summary: 'Listar productos',
    description:
      'Obtiene todos los productos con su bodega y registros de stock asociados. Requiere usuario autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos obtenida correctamente.',
    type: [Product],
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
    return this.productsService.findAll();
  }

  @Roles(UserRole.OWNER, UserRole.WINERY, UserRole.SELLER, UserRole.CLIENT)
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener producto por ID',
    description:
      'Busca un producto específico por su ID. Requiere usuario autenticado.',
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
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Roles(UserRole.OWNER, UserRole.WINERY)
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Subir imagen de producto',
    description:
      'Sube una imagen del producto/vino a Cloudinary y guarda la URL en imageUrl. Requiere rol OWNER o WINERY.',
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
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
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

  @Roles(UserRole.OWNER, UserRole.WINERY)
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar producto',
    description:
      'Actualiza datos del producto. También permite cambiar la bodega asociada. Requiere rol OWNER o WINERY.',
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
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
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

  @Roles(UserRole.OWNER, UserRole.WINERY)
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar producto',
    description: 'Elimina un producto por ID. Requiere rol OWNER o WINERY.',
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
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  @ApiResponse({
    status: 403,
    description: 'Acceso denegado por rol.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}