import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Express } from 'express';

import { Winery } from './entities/winery.entity';
import { CreateWineryDto } from './dto/create-winery.dto';
import { UpdateWineryDto } from './dto/update-winery.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class WineriesService {
  constructor(
    @InjectRepository(Winery)
    private readonly wineryRepository: Repository<Winery>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createWineryDto: CreateWineryDto): Promise<Winery> {
    const exists = await this.wineryRepository.findOne({
      where: { name: createWineryDto.name },
    });

    if (exists) {
      throw new BadRequestException('La bodega ya existe');
    }

    const winery = this.wineryRepository.create(createWineryDto);

    return this.wineryRepository.save(winery);
  }

  async findAll(): Promise<Winery[]> {
    return await this.wineryRepository.find({
      relations: ['products'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Winery> {
    const winery = await this.wineryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!winery) {
      throw new NotFoundException(`Winery with id ${id} not found`);
    }

    return winery;
  }

  async update(id: string, updateWineryDto: UpdateWineryDto): Promise<Winery> {
    const winery = await this.findOne(id);

    Object.assign(winery, updateWineryDto);

    return await this.wineryRepository.save(winery);
  }

  async remove(id: string): Promise<{ message: string }> {
    const winery = await this.findOne(id);

    await this.wineryRepository.softDelete(winery.id);

    return {
      message: `Winery with id ${id} deleted successfully`,
    };
  }

  async restore(id: string): Promise<{ message: string }> {
    const winery = await this.wineryRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!winery) {
      throw new NotFoundException(`Winery with id ${id} not found`);
    }

    if (!winery.deletedAt) {
      return {
        message: `Winery with id ${id} is not deleted`,
      };
    }

    await this.wineryRepository.restore(id);

    return {
      message: `Winery with id ${id} restored successfully`,
    };
  }

  async uploadImage(id: string, file: Express.Multer.File): Promise<Winery> {
    const winery = await this.findOne(id);

    const result = await this.cloudinaryService.uploadImage(file, 'wineries');

    winery.imageUrl = result.secure_url;

    return await this.wineryRepository.save(winery);
  }

  async findProductsByWinery(id: string) {
    const winery = await this.wineryRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!winery) {
      throw new NotFoundException(`Winery with id ${id} not found`);
    }

    return winery.products;
  }
}