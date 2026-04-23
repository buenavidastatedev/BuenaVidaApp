import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, IsUUID, Min } from 'class-validator';

export class CreateOrderItemDto {
    @ApiProperty({ example: 'uuid-del-pedido' })
    @IsUUID()
    orderId: string;

    @ApiProperty({ example: 'uuid-del-producto' })
    @IsUUID()
    productId: string;

    @ApiProperty({ example: 2 })
    @IsInt()
    @Min(1)
    quantity: number;

    @ApiProperty({ example: 12500.5 })
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    price: number;
}