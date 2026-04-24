import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    IsBoolean,
    MinLength,
} from 'class-validator';
import { OAuthProvider, UserRole } from '../enums/user.enum';

export class CreateUserDto {
    @ApiProperty({
        example: 'sasha@gmail.com',
        description: 'Email único del usuario',
    })
    @IsEmail()
    email!: string;

    @ApiPropertyOptional({
        example: 'Sasha',
        description: 'Nombre del usuario',
    })
    @IsOptional()
    @IsString()
    firstname?: string;

    @ApiPropertyOptional({
        example: 'Davila',
        description: 'Apellido del usuario',
    })
    @IsOptional()
    @IsString()
    lastname?: string;

    @ApiPropertyOptional({
        example: 'https://miapp.com/avatar.png',
        description: 'URL del avatar del usuario',
    })
    @IsOptional()
    @IsString()
    avatarUrl?: string;

    @ApiPropertyOptional({
        example: '12345678',
        description: 'Contraseña del usuario',
    })
    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;

    @ApiPropertyOptional({
        enum: UserRole,
        example: UserRole.CLIENT,
        description: 'Rol del usuario',
    })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @ApiPropertyOptional({
        enum: OAuthProvider,
        example: OAuthProvider.LOCAL,
        description: 'Proveedor de autenticación',
    })
    @IsOptional()
    @IsEnum(OAuthProvider)
    provider?: OAuthProvider;

    @ApiPropertyOptional({
        example: 'google-sub-123456',
        description: 'ID del proveedor OAuth',
    })
    @IsOptional()
    @IsString()
    providerId?: string;

    @ApiPropertyOptional({
        example: 'refresh-token-demo',
        description: 'Refresh token del usuario',
    })
    @IsOptional()
    @IsString()
    refreshToken?: string;

    @ApiPropertyOptional({
        example: true,
        description: 'Indica si el usuario está activo',
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}