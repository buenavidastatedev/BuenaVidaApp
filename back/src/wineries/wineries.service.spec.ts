import { Test, TestingModule } from '@nestjs/testing';
import { WineriesService } from './wineries.service';

describe('WineriesService', () => {
  let service: WineriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WineriesService],
    }).compile();

    service = module.get<WineriesService>(WineriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
