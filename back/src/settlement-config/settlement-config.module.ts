import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SettlementConfigService } from './settlement-config.service';
import { SettlementConfigController } from './settlement-config.controller';
import { SettlementConfig } from './entities/settlement-config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SettlementConfig])],
  controllers: [SettlementConfigController],
  providers: [SettlementConfigService],
  exports: [SettlementConfigService],
})
export class SettlementConfigModule {}