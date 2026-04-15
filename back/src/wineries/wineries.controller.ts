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
import { FileInterceptor } from '@nestjs/platform-express';
import { WineriesService } from './wineries.service';
import { CreateWineryDto } from './dto/create-winery.dto';
import { UpdateWineryDto } from './dto/update-winery.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

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

  @Get(':id/products')
  findProductsByWinery(@Param('id') id: string) {
    return this.wineriesService.findProductsByWinery(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWineryDto: UpdateWineryDto,
  ) {
    return this.wineriesService.update(id, updateWineryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wineriesService.remove(id);
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
  },
})
uploadImage(
  @Param('id') id: string,
  @UploadedFile() file: Express.Multer.File,
) {
  return this.wineriesService.uploadImage(id, file);
}
}