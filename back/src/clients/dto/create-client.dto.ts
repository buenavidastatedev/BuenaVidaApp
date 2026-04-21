import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
} from 'class-validator';

export class CreateClientDto {
    @ApiProperty({ example: 'Vinoteca Don Julio' })
    @IsString()
    @MaxLength(150)
    name: string;

    @ApiPropertyOptional({ example: 'Av. Siempre Viva 123' })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    address?: string;

    @ApiPropertyOptional({ example: '+54 11 1234 5678' })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    phone?: string;

    @ApiProperty({ example: 'uuid-del-user' })
    @IsUUID()
    userId: string;

    @ApiPropertyOptional({ example: 'uuid-del-seller' })
    @IsOptional()
    @IsUUID()
    sellerId?: string;
}