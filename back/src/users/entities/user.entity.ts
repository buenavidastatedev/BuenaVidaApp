import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { OAuthProvider, UserRole } from '../enums/user.enum';
import { Seller } from '../../sellers/entities/seller.entity';
import { Client } from '../../clients/entities/client.entity';

@Entity('users')
export class User {
  @ApiProperty({
    example: '5b7e5e63-ef54-4a9a-8c3c-1a0f34f0f1a2',
    description: 'ID único del usuario',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'sasha@gmail.com',
    description: 'Email único del usuario',
  })
  @Index({ unique: true })
  @Column({ unique: true })
  email!: string;

  @ApiPropertyOptional({
    example: 'Sasha',
    description: 'Nombre del usuario',
  })
  @Column({ nullable: true })
  firstname!: string;

  @ApiPropertyOptional({
    example: 'Davila',
    description: 'Apellido del usuario',
  })
  @Column({ nullable: true })
  lastname!: string;

  @ApiPropertyOptional({
    example: 'https://miapp.com/avatar.png',
    description: 'URL del avatar del usuario',
  })
  @Column({ nullable: true })
  avatarUrl!: string;

  @ApiHideProperty()
  @Column({ nullable: true, select: false })
  password!: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.CLIENT,
    description: 'Rol del usuario',
  })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role!: UserRole;

  @ApiProperty({
    enum: OAuthProvider,
    example: OAuthProvider.LOCAL,
    description: 'Proveedor de autenticación',
  })
  @Column({ type: 'enum', enum: OAuthProvider, default: OAuthProvider.LOCAL })
  provider!: OAuthProvider;

  @ApiPropertyOptional({
    example: 'google-sub-123456',
    description: 'ID del proveedor OAuth',
  })
  @Index()
  @Column({ nullable: true })
  providerId!: string;

  @ApiHideProperty()
  @Column({ nullable: true })
  refreshToken!: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el usuario está activo',
  })
  @Column({ default: true })
  isActive!: boolean;

  @ApiProperty({
    example: '2026-04-23T12:00:00.000Z',
    description: 'Fecha de creación',
  })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({
    example: '2026-04-23T12:30:00.000Z',
    description: 'Fecha de última actualización',
  })
  @UpdateDateColumn()
  updatedAt!: Date;

  @ApiHideProperty()
  @OneToOne(() => Seller, (seller) => seller.user)
  seller!: Seller;

  @ApiHideProperty()
  @OneToOne(() => Client, (client) => client.user)
  client!: Client;
}