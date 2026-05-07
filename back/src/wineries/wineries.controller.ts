import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
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

import { WineriesService } from './wineries.service';
import { CreateWineryDto } from './dto/create-winery.dto';
import { UpdateWineryDto } from './dto/update-winery.dto';
import { Winery } from './entities/winery.entity';

@ApiTags('Wineries')
@ApiBearerAuth()
@Controller('wineries')
export class WineriesController {
  constructor(private readonly wineriesService: WineriesService) {}

  @Post()
  create(@Body() createWineryDto: CreateWineryDto) {
    return this.wineriesService.create(createWineryDto);
  }

  @Get()
  findAll() {
    return this.wineriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wineriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWineryDto: UpdateWineryDto,
  ) {
    return this.wineriesService.update(id, updateWineryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar bodega',
    description: 'Realiza un soft delete de una bodega por ID.',
  })
  remove(@Param('id') id: string) {
    return this.wineriesService.remove(id);
  }

  @Patch(':id/restore')
  @ApiOperation({
    summary: 'Restaurar bodega eliminada',
    description: 'Restaura una bodega eliminada con soft delete.',
  })
  restore(@Param('id') id: string) {
    return this.wineriesService.restore(id);
  }

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
    return this.wineriesService.uploadImage(id, file);
  }

  @Get(':id/products')
  @ApiOperation({
    summary: 'Obtener productos de una bodega',
  })
  @ApiParam({
    name: 'id',
    description: 'ID UUID de la bodega',
  })
  @ApiResponse({
    status: 200,
    description: 'Productos obtenidos correctamente.',
    type: [Winery],
  })
  findProductsByWinery(@Param('id') id: string) {
    return this.wineriesService.findProductsByWinery(id);
  }
}