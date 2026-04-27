import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsArray,
  ValidateNested,
  IsInt,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderItemDto {
  @ApiProperty({
    example: '75f4e79f-2178-4ef1-89c2-b2547f09e6f0',
    description: 'ID UUID del producto solicitado.',
  })
  @IsUUID()
  productId!: string;

  @ApiProperty({
    example: 2,
    description: 'Cantidad solicitada del producto.',
  })
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @ApiProperty({
    example: '0e47ecd3-5bd8-46dc-80ce-560da311d0c4',
    description: 'ID UUID del cliente que realiza el pedido.',
  })
  @IsUUID()
  clientId!: string;

  @ApiPropertyOptional({
    example: '95222d18-51b3-4d4d-982f-acab54cf9e5d',
    description: 'ID UUID del vendedor asociado al pedido. Opcional.',
  })
  @IsOptional()
  @IsUUID()
  sellerId?: string;

  @ApiProperty({
    description:
      'Productos incluidos en la orden. Todos deben pertenecer a la misma bodega.',
    example: [
      {
        productId: '75f4e79f-2178-4ef1-89c2-b2547f09e6f0',
        quantity: 2,
      },
    ],
    type: [CreateOrderItemDto],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}