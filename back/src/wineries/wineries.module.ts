import { Module } from '@nestjs/common';
import { WineriesService } from './wineries.service';
import { WineriesController } from './wineries.controller';

@Module({
  controllers: [WineriesController],
  providers: [WineriesService],
})
export class WineriesModule {}
