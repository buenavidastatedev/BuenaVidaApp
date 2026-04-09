import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Winery } from './entities/winery.entity';
import { CreateWineryDto } from './dto/create-winery.dto';
import { UpdateWineryDto } from './dto/update-winery.dto';

@Injectable()
export class WineriesService {
  constructor(
    @InjectRepository(Winery)
    private readonly wineryRepository: Repository<Winery>,
  ) {}

  async create(createWineryDto: CreateWineryDto): Promise<Winery> {
    const winery = this.wineryRepository.create(createWineryDto);
    return await this.wineryRepository.save(winery);
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

  async update(
    id: string,
    updateWineryDto: UpdateWineryDto,
  ): Promise<Winery> {
    const winery = await this.findOne(id);

    Object.assign(winery, updateWineryDto);

    return await this.wineryRepository.save(winery);
  }

  async remove(id: string): Promise<{ message: string }> {
    const winery = await this.findOne(id);

    await this.wineryRepository.remove(winery);

    return {
      message: `Winery with id ${id} deleted successfully`,
    };
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