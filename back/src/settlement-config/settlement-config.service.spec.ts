import { Test, TestingModule } from '@nestjs/testing';
import { SettlementConfigService } from './settlement-config.service';

describe('SettlementConfigService', () => {
  let service: SettlementConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SettlementConfigService],
    }).compile();

    service = module.get<SettlementConfigService>(SettlementConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
