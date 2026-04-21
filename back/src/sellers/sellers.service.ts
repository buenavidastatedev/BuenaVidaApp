import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Seller } from './entities/seller.entity';
import { User } from '../users/entities/user.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const { userId } = createSellerDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['seller'],
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    if (user.seller) {
      throw new ConflictException(`User with id ${userId} already has a seller profile`);
    }

    const seller = this.sellerRepository.create({
      user,
    });

    return await this.sellerRepository.save(seller);
  }

  async findAll(): Promise<Seller[]> {
    return await this.sellerRepository.find({
      relations: ['user', 'clients', 'orders'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Seller> {
    const seller = await this.sellerRepository.findOne({
      where: { id },
      relations: ['user', 'clients', 'orders'],
    });

    if (!seller) {
      throw new NotFoundException(`Seller with id ${id} not found`);
    }

    return seller;
  }

  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<Seller> {
    const seller = await this.findOne(id);

    if (updateSellerDto.userId) {
      const user = await this.userRepository.findOne({
        where: { id: updateSellerDto.userId },
        relations: ['seller'],
      });

      if (!user) {
        throw new NotFoundException(`User with id ${updateSellerDto.userId} not found`);
      }

      if (user.seller && user.seller.id !== seller.id) {
        throw new ConflictException(
          `User with id ${updateSellerDto.userId} already has a seller profile`,
        );
      }

      seller.user = user;
    }

    return await this.sellerRepository.save(seller);
  }

  async remove(id: string): Promise<{ message: string }> {
    const seller = await this.findOne(id);

    await this.sellerRepository.remove(seller);

    return {
      message: `Seller with id ${id} deleted successfully`,
    };
  }
}