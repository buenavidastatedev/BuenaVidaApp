import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../../common/decorators/guards/filters/interceptors/enums/order-status.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiPropertyOptional({
    enum: OrderStatus,
    example: OrderStatus.PENDING,
    description: 'Estado actual de la orden.',
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}