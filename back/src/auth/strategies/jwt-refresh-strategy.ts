import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private config: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
    const secret = config.get<string>('JWT_REFRESH_SECRET');
    if (!secret)
      throw new Error('JWT_REFRESH_SECRET no está definido en el .env');

    super({
      // El refresh token viene en el body, no en el header
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: secret,
      ignoreExpiration: false,
      // Necesitamos acceso al request completo para leer el body
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { sub: string }) {
    const body = req.body as { refreshToken: string };
    const refreshToken = body.refreshToken;

    const user = await this.userRepo.findOne({
      where: { id: payload.sub, isActive: true },
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }

    return user;
  }
}
