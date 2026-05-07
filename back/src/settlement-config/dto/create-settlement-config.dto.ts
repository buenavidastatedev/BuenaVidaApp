import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateSettlementConfigDto {
    @ApiProperty({
        example: 5,
        description: 'Porcentaje de comisión aplicado a la liquidación',
    })
    @IsNumber()
    @Min(0)
    commissionPercentage!: number;

    @ApiProperty({
        example: 19,
        description: 'Porcentaje de IVA aplicado a la liquidación',
    })
    @IsNumber()
    @Min(0)
    ivaPercentage!: number;

    @ApiProperty({
        example: true,
        description: 'Indica si esta configuración está activa',
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}