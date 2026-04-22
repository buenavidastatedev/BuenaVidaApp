import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { OAuthProfile } from './dto/oauth-profile.dto';
import { OAuthProvider } from 'src/users/enums/user.enum';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  // ─── Tokens ────────────────────────────────────────────

  private generateTokens(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessSecret = this.config.get<string>('JWT_ACCESS_SECRET');
    const refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET');

    if (!accessSecret || !refreshSecret)
      throw new Error('JWT secrets no están definidos en el .env');

    const accessToken = this.jwtService.sign(payload, {
      secret: accessSecret,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: refreshSecret,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(userId: string, token: string) {
    const hashed = await bcrypt.hash(token, 10);
    await this.userRepo.update(userId, { refreshToken: hashed });
  }

  // ─── Register local ────────────────────────────────────

  async create(dto: RegisterAuthDto) {
    const exists = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (exists) {
      throw new UnauthorizedException('El email ya existe');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      email: dto.email,
      firstname: dto.firstname,
      password: hashed,
      role: dto.role,
      provider: OAuthProvider.LOCAL,
    });

    await this.userRepo.save(user);

    const tokens = this.generateTokens(user);

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  // ─── Login local ───────────────────────────────────────

  async login(dto: LoginAuthDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
      select: [
        'id',
        'email',
        'password',
        'role',
        'isActive',
        'provider',
        'refreshToken',
        'firstname',
        'avatarUrl',
        'providerId',
        'createdAt',
        'updatedAt',
      ],
    });

    if (!user || !user.password)
      throw new UnauthorizedException('Credenciales inválidas');

    const valid = await bcrypt.compare(dto.password ?? '', user.password);
    if (!valid) throw new UnauthorizedException('Credenciales inválidas');

    if (!user.isActive)
      throw new UnauthorizedException('Tu cuenta está desactivada');

    const tokens = this.generateTokens(user);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    return { ...tokens, user };
  }

  // ─── Google OAuth ──────────────────────────────────────

  async googleLogin(profile: OAuthProfile) {
    let user = await this.userRepo.findOne({
      where: { providerId: profile.providerId, provider: OAuthProvider.GOOGLE },
    });

    if (!user) {
      user = await this.userRepo.findOne({ where: { email: profile.email } });

      if (user) {
        user.providerId = profile.providerId;
        user.provider = OAuthProvider.GOOGLE;
        user.avatarUrl = user.avatarUrl ?? profile.avatarUrl;
        await this.userRepo.save(user);
      }
    }

    if (!user) {
      user = this.userRepo.create({
        email: profile.email,
        firstname: profile.firstname,
        avatarUrl: profile.avatarUrl,
        providerId: profile.providerId,
        provider: OAuthProvider.GOOGLE,
      });
      await this.userRepo.save(user);
    }

    if (!user.isActive)
      throw new UnauthorizedException('Tu cuenta está desactivada');

    const tokens = this.generateTokens(user);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  // ─── Refresh token ─────────────────────────────────────

  async refreshTokens(user: User, refreshToken: string) {
    if (!user.refreshToken)
      throw new UnauthorizedException('Refresh token no encontrado');

    const valid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!valid) throw new UnauthorizedException('Refresh token inválido');

    const tokens = this.generateTokens(user);
    await this.saveRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  // ─── Logout ────────────────────────────────────────────

  async logout(userId: string) {
    await this.userRepo.update(userId, { refreshToken: '' });
    return { message: 'Sesión cerrada correctamente' };
  }
}
