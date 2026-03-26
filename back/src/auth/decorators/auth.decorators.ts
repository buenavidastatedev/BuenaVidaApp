import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { UserRole } from '../../users/enums/user.enum';
import { User } from 'src/users/entities/user.entity';

// ─── @Public() ───────────────────────────────────────────
// Marca una ruta como pública
// El JwtAuthGuard lee esta key y deja pasar sin verificar JWT
//
// Uso:
//   @Public()
//   @Post('login')
//   login() { ... }

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// ─── @Roles() ────────────────────────────────────────────
// Indica qué roles pueden acceder a una ruta
// El RolesGuard lee esta key y verifica el rol del usuario
//
// Uso:
//   @Roles(UserRole.ADMIN, UserRole.SELLER)
//   @Get('reportes')
//   getReportes() { ... }

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

// ─── @CurrentUser() ──────────────────────────────────────
// Inyecta el usuario autenticado en el parámetro del método
// Lo saca de request.user que puso la JwtStrategy
//
// Uso completo — te da el objeto User entero:
//   @Get('perfil')
//   getPerfil(@CurrentUser() user: User) { ... }
//
// Uso con campo — te da solo un campo del usuario:
//   @Get('perfil')
//   getPerfil(@CurrentUser('email') email: string) { ... }

export const CurrentUser = createParamDecorator(
  (field: keyof User | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;
    return field ? user?.[field] : user;
  },
);
