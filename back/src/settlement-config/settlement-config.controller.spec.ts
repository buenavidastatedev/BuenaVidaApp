import { Test, TestingModule } from '@nestjs/testing';
import { SettlementConfigController } from './settlement-config.controller';
import { SettlementConfigService } from './settlement-config.service';

describe('SettlementConfigController', () => {
  let controller: SettlementConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettlementConfigController],
      providers: [SettlementConfigService],
    }).compile();

    controller = module.get<SettlementConfigController>(SettlementConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
