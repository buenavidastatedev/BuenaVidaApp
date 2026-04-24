import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class OAuthProfile {
  @IsString()
  @IsNotEmpty()
  providerId!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsString()
  provider!: string;
}