import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Express } from 'express';

import { Product } from './entities/product.entity';
import { Winery } from '../wineries/entities/winery.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Winery)
    private readonly wineryRepository: Repository<Winery>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { wineryId, ...productData } = createProductDto;

    const winery = await this.wineryRepository.findOne({
      where: { id: wineryId },
    });

    if (!winery) {
      throw new NotFoundException(`Winery with id ${wineryId} not found`);
    }

    const product = this.productRepository.create({
      ...productData,
      winery,
    });

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      relations: ['winery', 'stocks'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['winery', 'stocks'],
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    if (updateProductDto.wineryId) {
      const winery = await this.wineryRepository.findOne({
        where: { id: updateProductDto.wineryId },
      });

      if (!winery) {
        throw new NotFoundException(
          `Winery with id ${updateProductDto.wineryId} not found`,
        );
      }

      product.winery = winery;
    }

    if (updateProductDto.name !== undefined) {
      product.name = updateProductDto.name;
    }

    if (updateProductDto.price !== undefined) {
      product.price = updateProductDto.price;
    }

    if (updateProductDto.imageUrl !== undefined) {
      product.imageUrl = updateProductDto.imageUrl;
    }

    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<{ message: string }> {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);

    return {
      message: `Product with id ${id} deleted successfully`,
    };
  }

  async uploadImage(id: string, file: Express.Multer.File): Promise<Product> {
    const product = await this.findOne(id);

    const result = await this.cloudinaryService.uploadImage(file, 'products');

    product.imageUrl = result.secure_url;

    return await this.productRepository.save(product);
  }
}