import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Winery } from '../wineries/entities/winery.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Winery]), CloudinaryModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
