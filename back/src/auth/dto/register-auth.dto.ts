import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../users/enums/user.enum';

export class RegisterAuthDto {
  @ApiProperty({
    example: 'sasha@gmail.com',
    description: 'Email único del usuario.',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Sasha',
    description: 'Nombre del usuario.',
  })
  @IsString()
  firstname!: string;

  @ApiProperty({
    example: '12345678',
    description: 'Contraseña. Debe tener al menos 8 caracteres.',
  })
  @MinLength(8)
  password!: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.CLIENT,
    description: 'Rol inicial del usuario.',
  })
  @IsEnum(UserRole)
  role!: UserRole;
}