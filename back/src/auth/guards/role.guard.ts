import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/auth.decorators';
import { UserRole } from '../../users/enums/user.enum';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) return true;

    // Tipamos el request para que TypeScript sepa que user es de tipo User
    const request = ctx.switchToHttp().getRequest<{ user: User }>();
    const { user } = request;

    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Tu cuenta está desactivada');
    }

    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException(
        `Acceso denegado. Roles permitidos: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
