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
  @ApiProperty({ example: 'sasha@gmail.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'Sasha' })
  @IsOptional()
  @IsString()
  firstname?: string;

  @ApiPropertyOptional({ example: 'Davila' })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiPropertyOptional({ example: 'https://miapp.com/avatar.png' })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiPropertyOptional({ example: '12345678' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.CLIENT })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ enum: OAuthProvider, example: OAuthProvider.LOCAL })
  @IsOptional()
  @IsEnum(OAuthProvider)
  provider?: OAuthProvider;

  @ApiPropertyOptional({ example: 'google-sub-123456' })
  @IsOptional()
  @IsString()
  providerId?: string;

  @ApiPropertyOptional({ example: 'refresh-token-demo' })
  @IsOptional()
  @IsString()
  refreshToken?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
