import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsInt,
    IsNumber,
    IsPositive,
    IsUUID,
    MaxLength,
    Min,
    IsString,
    IsOptional,
    IsUrl,
} from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'Malbec Reserva' })
    @IsString()
    @MaxLength(150)
    name: string;

    @ApiProperty({ example: 'uuid-de-la-bodega' })
    @IsUUID()
    wineryId: string;

    @ApiProperty({ example: 12500.5 })
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    price: number;

    @ApiProperty({ example: 100 })
    @IsInt()
    @Min(0)
    stock: number;

    @ApiPropertyOptional({ example: 'https://res.cloudinary.com/demo/image/upload/sample.jpg' })
    @IsOptional()
    @IsString()
    @IsUrl()
    imageUrl?: string;
}