import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/users/enums/user.enum';

export class RegisterAuthDto {
  @IsEmail({}, { message: 'El email no es válido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido no es valido' })
  @MinLength(5)
  @MaxLength(30)
  lastname: string;

  @IsString()
  @MinLength(8, {
    message: 'La contraseña debe contener al menos 8 caracteres',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'La contraseña debe incluir mayúsculas, minúsculas y números',
  })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Rol invalido' })
  role: UserRole;
}
