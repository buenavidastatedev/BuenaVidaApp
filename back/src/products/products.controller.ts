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
  Query,
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
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Roles(UserRole.OWNER, UserRole.WINERY, UserRole.SELLER, UserRole.CLIENT)
  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;

    return this.productsService.findAll(pageNum, limitNum);
  }

  @Roles(UserRole.OWNER, UserRole.WINERY, UserRole.SELLER, UserRole.CLIENT)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Roles(UserRole.OWNER, UserRole.WINERY)
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file'))
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
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productsService.uploadImage(id, file);
  }

  @Roles(UserRole.OWNER, UserRole.WINERY)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Roles(UserRole.OWNER, UserRole.WINERY)
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar producto',
    description:
      'Realiza un soft delete de un producto por ID. Requiere rol OWNER o WINERY.',
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Roles(UserRole.OWNER, UserRole.WINERY)
  @Patch(':id/restore')
  @ApiOperation({
    summary: 'Restaurar producto eliminado',
    description:
      'Restaura un producto eliminado con soft delete. Requiere rol OWNER o WINERY.',
  })
  restore(@Param('id') id: string) {
    return this.productsService.restore(id);
  }
}