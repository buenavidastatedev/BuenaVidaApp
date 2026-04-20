import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateSellerDto {
    @ApiProperty({ example: 'uuid-del-user' })
    @IsUUID()
    userId: string;
}