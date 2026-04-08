import { Injectable } from '@nestjs/common';
import { CreateWineryDto } from './dto/create-winery.dto';
import { UpdateWineryDto } from './dto/update-winery.dto';

@Injectable()
export class WineriesService {
  create(createWineryDto: CreateWineryDto) {
    return 'This action adds a new winery';
  }

  findAll() {
    return `This action returns all wineries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} winery`;
  }

  update(id: number, updateWineryDto: UpdateWineryDto) {
    return `This action updates a #${id} winery`;
  }

  remove(id: number) {
    return `This action removes a #${id} winery`;
  }
}
