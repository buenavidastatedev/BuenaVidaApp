import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,UploadedFile,
  UseInterceptors,
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

import { WineriesService } from './wineries.service';
import { CreateWineryDto } from './dto/create-winery.dto';
import { UpdateWineryDto } from './dto/update-winery.dto';
import { Winery } from './entities/winery.entity';
import { Public } from '../auth/decorators/auth.decorators';

@ApiTags('Wineries')
@Controller('wineries')
export class WineriesController {
  constructor(private readonly wineriesService: WineriesService) {}

  @Public()
  @Post()
  @ApiOperation({
    summary: 'Crear bodega',
    description:
      'Crea una bodega/vinoteca con nombre, descripción, imagen opcional y estado activo.',
  })
  @ApiBody({ type: CreateWineryDto })
  @ApiResponse({
    status: 201,
    description: 'Bodega creada correctamente.',
    type: Winery,
  })
  create(@Body() createWineryDto: CreateWineryDto) {
    return this.wineriesService.create(createWineryDto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Listar bodegas',
    description:
      'Obtiene todas las bodegas con sus productos asociados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de bodegas obtenida correctamente.',
    type: [Winery],
  })
  findAll() {
    return this.wineriesService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener bodega por ID',
    description: 'Busca una bodega específica por su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID de la bodega',
    example: '5b7e5e63-ef54-4a9a-8c3c-1a0f34f0f1a2',
  })
  @ApiResponse({
    status: 200,
    description: 'Bodega encontrada correctamente.',
    type: Winery,
  })
  @ApiResponse({
    status: 404,
    description: 'Bodega no encontrada.',
  })
  findOne(@Param('id') id: string) {
    return this.wineriesService.findOne(id);
  }

  @Public()
  @Get(':id/products')
  @ApiOperation({
    summary: 'Listar productos de una bodega',
    description:
      'Obtiene todos los productos/vinos asociados a una bodega específica.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID de la bodega',
    example: '5b7e5e63-ef54-4a9a-8c3c-1a0f34f0f1a2',
  })
  @ApiResponse({
    status: 200,
    description: 'Productos de la bodega obtenidos correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Bodega no encontrada.',
  })
  findProductsByWinery(@Param('id') id: string) {
    return this.wineriesService.findProductsByWinery(id);
  }

  @Public()
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar bodega',
    description: 'Actualiza los datos de una bodega existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID de la bodega',
    example: '5b7e5e63-ef54-4a9a-8c3c-1a0f34f0f1a2',
  })
  @ApiBody({ type: UpdateWineryDto })
  @ApiResponse({
    status: 200,
    description: 'Bodega actualizada correctamente.',
    type: Winery,
  })
  @ApiResponse({
    status: 404,
    description: 'Bodega no encontrada.',
  })
  update(@Param('id') id: string, @Body() updateWineryDto: UpdateWineryDto) {
    return this.wineriesService.update(id, updateWineryDto);
  }

  @Public()
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Subir imagen de bodega',
    description:
      'Sube una imagen/logo de bodega a Cloudinary y guarda la URL en imageUrl.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID de la bodega',
    example: '5b7e5e63-ef54-4a9a-8c3c-1a0f34f0f1a2',
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
    type: Winery,
  })
  @ApiResponse({
    status: 404,
    description: 'Bodega no encontrada.',
  })
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.wineriesService.uploadImage(id, file);
  }

  @Public()
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar bodega',
    description: 'Elimina una bodega por ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID de la bodega',
    example: '5b7e5e63-ef54-4a9a-8c3c-1a0f34f0f1a2',
  })
  @ApiResponse({
    status: 200,
    description: 'Bodega eliminada correctamente.',
    schema: {
      example: {
        message:
          'Winery with id 5b7e5e63-ef54-4a9a-8c3c-1a0f34f0f1a2 deleted successfully',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Bodega no encontrada.',
  })
  remove(@Param('id') id: string) {
    return this.wineriesService.remove(id);
  }
}