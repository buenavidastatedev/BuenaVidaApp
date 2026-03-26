import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshToken } from './dto/refresh-token.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { CurrentUser } from './decorators/auth.decorators';
import { Public } from './decorators/auth.decorators';
import { User } from 'src/users/entities/user.entity';
import { OAuthProfile } from './dto/oauth-profile.dto';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  // ─── Local ─────────────────────────────────────────────

  @Public()
  @Post('register')
  register(@Body() dto: RegisterAuthDto) {
    return this.authService.create(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  // ─── Google OAuth ──────────────────────────────────────

  // Paso 1: redirige al usuario a la pantalla de Google
  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Passport redirige automáticamente a Google — este método queda vacío
  }

  // Paso 2: Google redirige acá con el perfil del usuario
  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.authService.googleLogin(req.user as OAuthProfile);

    const frontendUrl = this.config.get<string>('FRONTEND_URL');

    // Redirigimos al frontend con los tokens en la URL
    // El frontend los lee del query param y los guarda
    return res.redirect(
      `${frontendUrl}/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`,
    );
  }

  // ─── Refresh & Logout ──────────────────────────────────

  @Public()
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  refresh(@CurrentUser() user: User, @Body() body: RefreshToken) {
    return this.authService.refreshTokens(user, body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@CurrentUser('id') userId: string) {
    return this.authService.logout(userId);
  }

  // ─── Perfil ────────────────────────────────────────────

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}
