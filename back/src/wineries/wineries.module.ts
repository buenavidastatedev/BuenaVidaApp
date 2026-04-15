import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WineriesService } from './wineries.service';
import { WineriesController } from './wineries.controller';
import { Winery } from './entities/winery.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';


@Module({
  imports: [TypeOrmModule.forFeature([Winery]), CloudinaryModule],
  controllers: [WineriesController],
  providers: [WineriesService],
})
export class WineriesModule {}