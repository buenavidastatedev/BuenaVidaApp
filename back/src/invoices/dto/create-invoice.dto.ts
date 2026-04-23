import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { InvoiceType } from '../../common/decorators/guards/filters/interceptors/enums/invoice-type.enum';

export class CreateInvoiceDto {
    @ApiProperty({ example: 'uuid-de-la-order' })
    @IsUUID()
    orderId: string;

    @ApiProperty({ enum: InvoiceType, example: InvoiceType.QUOTE })
    @IsEnum(InvoiceType)
    type: InvoiceType;

    @ApiProperty({ example: 25000.5 })
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsPositive()
    total: number;
}