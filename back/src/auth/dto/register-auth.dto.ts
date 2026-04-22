import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../users/enums/user.enum';

export class RegisterAuthDto {
  @IsEmail()
  email!: string;

  @IsString()
  firstname!: string;

  @MinLength(8)
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}
