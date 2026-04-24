import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateSellerDto {
    @ApiProperty({
        example: '0528da3c-9287-4904-914f-8b46d11c9ff3',
        description: 'ID del usuario que será asociado al perfil de vendedor.',
    })
    @IsUUID()
    userId!: string;
}