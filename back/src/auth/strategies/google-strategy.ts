import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private config: ConfigService) {
    super({
      clientID: config.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: config.get<string>('GOOGLE_CALLBACK_URL')!,
      scope: ['email', 'profile'],
    });
  }

  // Google llama a este método automáticamente después de que el usuario
  // aprueba el acceso — acá recibís el perfil del usuario
  validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const { id, emails, name, photos } = profile;

    // Armamos un objeto con los datos que nos interesan
    // Este objeto queda disponible en request.user
    return {
      providerId: id, // el "sub" de Google
      email: emails?.[0]?.value,
      firstName: name?.givenName,
      lastName: name?.familyName,
      avatarUrl: photos?.[0]?.value,
      provider: 'google',
    };
  }
}
