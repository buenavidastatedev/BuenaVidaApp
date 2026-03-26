import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/users/enums/user.enum';

export class UpdateRole {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(UserRole, { message: 'Role invalido' })
  role: UserRole;
}
