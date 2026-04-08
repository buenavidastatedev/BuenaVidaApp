import { PartialType } from '@nestjs/swagger';
import { CreateWineryDto } from './create-winery.dto';

export class UpdateWineryDto extends PartialType(CreateWineryDto) {}
