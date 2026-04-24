import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { MovementType } from '../entities/stock-movement.entity';

export class MoveStockDto {
    @ApiProperty({
        example: 'uuid-del-stock',
        description: 'ID UUID del registro de stock.',
    })
    @IsUUID()
    stockId!: string;

    @ApiProperty({
        example: 10,
        description: 'Cantidad a mover.',
    })
    @IsInt()
    @Min(1)
    quantity!: number;

    @ApiProperty({
        enum: MovementType,
        example: MovementType.IN,
        description: 'Tipo de movimiento: IN suma stock, OUT resta stock.',
    })
    @IsEnum(MovementType)
    type!: MovementType;

    @ApiPropertyOptional({
        example: 'Carga inicial de mercadería',
        description: 'Motivo del movimiento.',
    })
    @IsOptional()
    @IsString()
    reason?: string;
}