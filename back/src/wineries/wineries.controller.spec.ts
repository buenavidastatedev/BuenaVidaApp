import { Test, TestingModule } from '@nestjs/testing';
import { WineriesController } from './wineries.controller';
import { WineriesService } from './wineries.service';

describe('WineriesController', () => {
  let controller: WineriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WineriesController],
      providers: [WineriesService],
    }).compile();

    controller = module.get<WineriesController>(WineriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
