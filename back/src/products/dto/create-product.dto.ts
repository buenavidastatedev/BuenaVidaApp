import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsPositive,
  IsUUID,
  MaxLength,
  IsString,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Malbec Reserva',
    description: 'Nombre del producto o vino.',
  })
  @IsString()
  @MaxLength(150)
  name!: string;

  @ApiProperty({
    example: '63eadd94-c1bc-404e-b641-d9fbbce62abf',
    description: 'ID UUID de la bodega a la que pertenece el producto.',
  })
  @IsUUID()
  wineryId!: string;

  @ApiProperty({
    example: 12500.5,
    description: 'Precio unitario del producto.',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price!: number;

  @ApiPropertyOptional({
    example: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    description:
      'URL de imagen del producto. También puede cargarse luego por Cloudinary.',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  imageUrl?: string;
}