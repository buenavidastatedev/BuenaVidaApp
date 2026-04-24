import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsOptional,
    IsString,
    MaxLength,
    IsUrl,
} from 'class-validator';

export class CreateWineryDto {
    @ApiProperty({
        example: 'Catena Zapata',
        description: 'Nombre de la bodega o vinoteca.',
    })
    @IsString()
    @MaxLength(150)
    name!: string;

    @ApiPropertyOptional({
        example: 'Bodega referente de Mendoza.',
        description: 'Descripción breve de la bodega.',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        example: 'https://miapp.com/images/catena.png',
        description:
            'URL de imagen/logo de la bodega. También puede cargarse luego mediante el endpoint de imagen.',
    })
    @IsOptional()
    @IsString()
    @IsUrl()
    imageUrl?: string;

    @ApiPropertyOptional({
        example: true,
        default: true,
        description: 'Indica si la bodega está activa.',
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}