import { PartialType } from '@nestjs/swagger';
import { CreateSettlementConfigDto } from './create-settlement-config.dto';

export class UpdateSettlementConfigDto extends PartialType(CreateSettlementConfigDto) {}
