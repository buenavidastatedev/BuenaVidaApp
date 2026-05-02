import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, IsUUID, Min } from 'class-validator';

/**
 * DTO para persistencia real del item de orden
 * (este ya tiene orderId y price)
 */
export class CreateOrderItemDto {
  @ApiProperty({
    example: 'e21fa2fb-5e46-4f46-944e-bfb334f7c4cc',
    description: 'ID UUID de la orden a la que pertenece el item.',
  })
  @IsUUID()
  orderId!: string;

  @ApiProperty({
    example: '3a1b0e85-c597-47fa-9285-df4dae64f8d1',
    description: 'ID UUID del producto asociado al item.',
  })
  @IsUUID()
  productId!: string;

  @ApiProperty({
    example: 2,
    description: 'Cantidad del producto en la orden.',
  })
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiProperty({
    example: 12500.5,
    description: 'Precio unitario guardado al momento del pedido.',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price!: number;
}
