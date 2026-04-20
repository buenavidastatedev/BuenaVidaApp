import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { OrderStatus } from '../../common/decorators/guards/filters/interceptors/enums/order-status.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiPropertyOptional({ enum: OrderStatus, example: OrderStatus.CONFIRMED })
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;

    @ApiPropertyOptional({ example: 'uuid-del-cliente' })
    @IsOptional()
    @IsUUID()
    clientId?: string;

    @ApiPropertyOptional({ example: 'uuid-del-vendedor' })
    @IsOptional()
    @IsUUID()
    sellerId?: string ;
}