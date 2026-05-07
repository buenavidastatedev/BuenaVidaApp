import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SettlementConfig } from './entities/settlement-config.entity';
import { CreateSettlementConfigDto } from './dto/create-settlement-config.dto';
import { UpdateSettlementConfigDto } from './dto/update-settlement-config.dto';

@Injectable()
export class SettlementConfigService {
  constructor(
    @InjectRepository(SettlementConfig)
    private readonly settlementConfigRepository: Repository<SettlementConfig>,
  ) {}

  async create(
    createSettlementConfigDto: CreateSettlementConfigDto,
  ): Promise<SettlementConfig> {
    await this.settlementConfigRepository.update(
      { isActive: true },
      { isActive: false },
    );

    const config = this.settlementConfigRepository.create({
      ...createSettlementConfigDto,
      isActive: true,
    });

    return await this.settlementConfigRepository.save(config);
  }

  async findAll(): Promise<SettlementConfig[]> {
    return await this.settlementConfigRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findActive(): Promise<SettlementConfig> {
    const config = await this.settlementConfigRepository.findOne({
      where: { isActive: true },
    });

    if (!config) {
      const defaultConfig = this.settlementConfigRepository.create({
        commissionPercentage: 5,
        ivaPercentage: 19,
        isActive: true,
      });

      return await this.settlementConfigRepository.save(defaultConfig);
    }

    return config;
  }

  async findOne(id: string): Promise<SettlementConfig> {
    const config = await this.settlementConfigRepository.findOne({
      where: { id },
    });

    if (!config) {
      throw new NotFoundException(`Settlement config with id ${id} not found`);
    }

    return config;
  }

  async update(
    id: string,
    updateSettlementConfigDto: UpdateSettlementConfigDto,
  ): Promise<SettlementConfig> {
    const config = await this.findOne(id);

    Object.assign(config, updateSettlementConfigDto);

    return await this.settlementConfigRepository.save(config);
  }

  async activate(id: string): Promise<SettlementConfig> {
    const config = await this.findOne(id);

    await this.settlementConfigRepository.update(
      { isActive: true },
      { isActive: false },
    );

    config.isActive = true;

    return await this.settlementConfigRepository.save(config);
  }

  async remove(id: string): Promise<{ message: string }> {
    const config = await this.findOne(id);

    await this.settlementConfigRepository.remove(config);

    return {
      message: `Settlement config with id ${id} deleted successfully`,
    };
  }
}