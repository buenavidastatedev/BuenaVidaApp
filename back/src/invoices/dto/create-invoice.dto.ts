import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { InvoiceType } from '../../common/decorators/guards/filters/interceptors/enums/invoice-type.enum';

export class CreateInvoiceDto {
    @ApiProperty({
        example: 'e21fa2fb-5e46-4f46-944e-bfb334f7c4cc',
        description: 'ID UUID de la orden asociada al comprobante.',
    })
    @IsUUID()
    orderId!: string;

    @ApiProperty({
        enum: InvoiceType,
        example: InvoiceType.QUOTE,
        description: 'Tipo de comprobante. Puede ser presupuesto o remito.',
    })
    @IsEnum(InvoiceType)
    type!: InvoiceType;

    @ApiProperty({
        example: 25000.5,
        description: 'Total del comprobante.',
    })
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    total!: number;
}