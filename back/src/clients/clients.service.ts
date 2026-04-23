import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from './entities/client.entity';
import { User } from '../users/entities/user.entity';
import { Seller } from '../sellers/entities/seller.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const { userId, sellerId, ...clientData } = createClientDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    let seller: Seller | null = null;

    if (sellerId) {
      seller = await this.sellerRepository.findOne({
        where: { id: sellerId },
      });

      if (!seller) {
        throw new NotFoundException(`Seller with id ${sellerId} not found`);
      }
    }

    const client = this.clientRepository.create({
      ...clientData,
      user,
      seller,
    });

    return await this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find({
      relations: ['user', 'seller', 'orders'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['user', 'seller', 'orders'],
    });

    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    if (updateClientDto.userId) {
      const user = await this.userRepository.findOne({
        where: { id: updateClientDto.userId },
      });

      if (!user) {
        throw new NotFoundException(
          `User with id ${updateClientDto.userId} not found`,
        );
      }

      client.user = user;
    }

    if (updateClientDto.sellerId) {
      const seller = await this.sellerRepository.findOne({
        where: { id: updateClientDto.sellerId },
      });

      if (!seller) {
        throw new NotFoundException(
          `Seller with id ${updateClientDto.sellerId} not found`,
        );
      }

      client.seller = seller;
    }

    if (updateClientDto.name !== undefined) {
      client.name = updateClientDto.name;
    }

    if (updateClientDto.address !== undefined) {
      client.address = updateClientDto.address;
    }

    if (updateClientDto.phone !== undefined) {
      client.phone = updateClientDto.phone;
    }

    return await this.clientRepository.save(client);
  }

  async remove(id: string): Promise<{ message: string }> {
    const client = await this.findOne(id);

    await this.clientRepository.remove(client);

    return {
      message: `Client with id ${id} deleted successfully`,
    };
  }
}