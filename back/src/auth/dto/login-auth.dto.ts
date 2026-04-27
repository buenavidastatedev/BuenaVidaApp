import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
    @ApiProperty({
        example: 'sasha@gmail.com',
        description: 'Email del usuario.',
    })
    @IsEmail()
    email!: string;

    @ApiProperty({
        example: '12345678',
        description: 'Contraseña del usuario.',
    })
    @IsString()
    @MinLength(8)
    password!: string;
}