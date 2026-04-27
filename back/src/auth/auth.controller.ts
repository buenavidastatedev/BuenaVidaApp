import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshToken } from './dto/refresh-token.dto';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { CurrentUser, Public } from './decorators/auth.decorators';
import { User } from 'src/users/entities/user.entity';
import { OAuthProfile } from './dto/oauth-profile.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuario',
    description:
      'Crea un usuario local, hashea la contraseña y devuelve accessToken, refreshToken y datos del usuario.',
  })
  @ApiBody({ type: RegisterAuthDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado correctamente.',
    schema: {
      example: {
        accessToken: 'jwt-access-token',
        refreshToken: 'jwt-refresh-token',
        user: {
          id: 'uuid-del-user',
          email: 'sasha@gmail.com',
          firstname: 'Sasha',
          role: 'client',
          provider: 'local',
          isActive: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'El email ya existe o las credenciales no son válidas.',
  })
  register(@Body() dto: RegisterAuthDto) {
    return this.authService.create(dto);
  }

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Valida email y contraseña. Si son correctos, devuelve accessToken, refreshToken y el usuario.',
  })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({
    status: 201,
    description: 'Login correcto.',
    schema: {
      example: {
        accessToken: 'jwt-access-token',
        refreshToken: 'jwt-refresh-token',
        user: {
          id: 'uuid-del-user',
          email: 'sasha@gmail.com',
          firstname: 'Sasha',
          role: 'client',
          provider: 'local',
          isActive: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas o cuenta desactivada.',
  })
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Iniciar autenticación con Google',
    description:
      'Redirige al usuario a Google para iniciar sesión con OAuth.',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirección a Google.',
  })
  googleAuth() {}

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({
    summary: 'Callback de Google OAuth',
    description:
      'Google redirige a esta ruta luego del login. El backend crea o vincula el usuario y redirige al frontend con los tokens.',
  })
  @ApiResponse({
    status: 302,
    description:
      'Redirección al frontend con accessToken y refreshToken en query params.',
  })
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.authService.googleLogin(req.user as OAuthProfile);

    const frontendUrl = this.config.get<string>('FRONTEND_URL');

    return res.redirect(
      `${frontendUrl}/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`,
    );
  }

  @Public()
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @ApiOperation({
    summary: 'Renovar tokens',
    description:
      'Recibe un refreshToken válido y devuelve nuevos accessToken y refreshToken.',
  })
  @ApiBody({ type: RefreshToken })
  @ApiResponse({
    status: 201,
    description: 'Tokens renovados correctamente.',
    schema: {
      example: {
        accessToken: 'nuevo-jwt-access-token',
        refreshToken: 'nuevo-jwt-refresh-token',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token inválido o expirado.',
  })
  refresh(@CurrentUser() user: User, @Body() body: RefreshToken) {
    return this.authService.refreshTokens(user, body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cerrar sesión',
    description:
      'Elimina/invalida el refreshToken guardado del usuario autenticado.',
  })
  @ApiResponse({
    status: 201,
    description: 'Sesión cerrada correctamente.',
    schema: {
      example: {
        message: 'Sesión cerrada correctamente',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  logout(@CurrentUser('id') userId: string) {
    return this.authService.logout(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener perfil autenticado',
    description:
      'Devuelve los datos del usuario autenticado a partir del accessToken.',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil obtenido correctamente.',
    type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado. Token inválido o ausente.',
  })
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}