import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/auth.decorators';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(ctx: ExecutionContext) {
    // Fijate si la ruta tiene el decorator @Public()
    // Si lo tiene, deja pasar sin verificar el JWT
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (isPublic) return true;

    // Si no es pública, verifica el JWT
    return super.canActivate(ctx);
  }

  handleRequest<TUser = User>(
    err: Error | null,
    user: TUser | false,
    info: { message: string } | null,
  ): TUser {
    if (err || !user) {
      throw (
        err ??
        new UnauthorizedException(
          info?.message === 'jwt expired'
            ? 'Tu sesión expiró. Iniciá sesión nuevamente.'
            : 'No autorizado. Token inválido o ausente.',
        )
      );
    }
    return user;
  }
}
