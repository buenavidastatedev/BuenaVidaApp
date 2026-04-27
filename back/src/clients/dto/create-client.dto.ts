import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateClientDto {
    @ApiProperty({
        example: 'Vinoteca Don Julio',
        description: 'Nombre comercial o identificador del cliente.',
    })
    @IsString()
    @MaxLength(150)
    name!: string;

    @ApiPropertyOptional({
        example: 'Av. Siempre Viva 123',
        description: 'Dirección del cliente.',
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    address?: string;

    @ApiPropertyOptional({
        example: '+54 11 1234 5678',
        description: 'Teléfono de contacto del cliente.',
    })
    @IsOptional()
    @IsString()
    @MaxLength(30)
    phone?: string;

    @ApiProperty({
        example: '0528da3c-9287-4904-914f-8b46d11c9ff3',
        description: 'ID del usuario asociado al cliente.',
    })
    @IsUUID()
    userId!: string;

    @ApiPropertyOptional({
        example: '9f375f53-66f2-4a71-a1e3-11f9d17c987a',
        description: 'ID del vendedor asignado al cliente. Es opcional.',
    })
    @IsOptional()
    @IsUUID()
    sellerId?: string;
}