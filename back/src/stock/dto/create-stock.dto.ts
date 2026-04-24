import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateStockDto {
    @ApiProperty({
        example: '3a1b0e85-c597-47fa-9285-df4dae64f8d1',
        description: 'ID UUID del producto.',
    })
    @IsUUID()
    productId!: string;

    @ApiProperty({
        example: '63eadd94-c1bc-404e-b641-d9fbbce62abf',
        description: 'ID UUID de la bodega.',
    })
    @IsUUID()
    wineryId!: string;

    @ApiProperty({
        example: 100,
        description: 'Cantidad inicial de stock.',
    })
    @IsInt()
    @Min(0)
    quantity!: number;

    @ApiPropertyOptional({
        example: 20,
        description: 'Cantidad mínima sugerida para alertas de stock.',
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    minStock?: number;
}