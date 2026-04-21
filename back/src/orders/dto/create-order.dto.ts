import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    ArrayMinSize,
    IsArray,
    IsInt,
    IsOptional,
    IsUUID,
    Min,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderItemDto {
    @ApiProperty({ example: 'uuid-del-producto' })
    @IsUUID()
    productId: string;

    @ApiProperty({ example: 3 })
    @IsInt()
    @Min(1)
    quantity: number;
}

export class CreateOrderDto {
    @ApiProperty({ example: 'uuid-del-cliente' })
    @IsUUID()
    clientId: string;

    @ApiPropertyOptional({ example: 'uuid-del-vendedor' })
    @IsOptional()
    @IsUUID()
    sellerId?: string;

    @ApiProperty({
        type: [CreateOrderItemDto],
        example: [
            { productId: 'uuid-producto-1', quantity: 2 },
            { productId: 'uuid-producto-2', quantity: 1 },
        ],
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
}