import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly config: ConfigService) {
    const clientID = config.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = config.get<string>('GOOGLE_CLIENT_SECRET');
    const callbackURL = config.get<string>('GOOGLE_CALLBACK_URL');

    console.log('GOOGLE_CLIENT_ID:', clientID);
    console.log('GOOGLE_CALLBACK_URL:', callbackURL);

    if (!clientID) {
      throw new Error('GOOGLE_CLIENT_ID no está definido');
    }

    if (!clientSecret) {
      throw new Error('GOOGLE_CLIENT_SECRET no está definido');
    }

    if (!callbackURL) {
      throw new Error('GOOGLE_CALLBACK_URL no está definido');
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    try {
      const { id, emails, name, photos } = profile;

      const user = {
        providerId: id,
        email: emails?.[0]?.value,
        firstname: name?.givenName,
        avatarUrl: photos?.[0]?.value,
      };

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
