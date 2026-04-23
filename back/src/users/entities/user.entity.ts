import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OAuthProvider, UserRole } from '../enums/user.enum';
import { Seller } from '../../sellers/entities/seller.entity';
import { Client } from '../../clients/entities/client.entity';

@Entity('users')
export class User {
  // UUID generado automáticamente — más seguro que un ID numérico
  // porque no se puede adivinar cuántos usuarios hay
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email!: string;

  //nullable hace que el input pueda estar sin llenar, es decir, sea opcional
  @Column({ nullable: true })
  firstname!: string;

    @Column({ nullable: true })
  lastname!: string;

  @Column({ nullable: true })
  avatarUrl!: string;

  @Column({ nullable: true, select: false })
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role!: UserRole;

  @Column({ type: 'enum', enum: OAuthProvider, default: OAuthProvider.LOCAL })
  provider!: OAuthProvider;

  // El ID que nos devuelve Google cuando el usuario se loguea
  // Google llama a esto "sub" (subject)
  @Index()
  @Column({ nullable: true })
  providerId!: string;

  @Column({ nullable: true })
  refreshToken!: string;
  // Para poder desactivar un usuario sin borrarlo
  @Column({ default: true })
  isActive!: boolean;

  // TypeORM completa estas dos automáticamente
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => Seller, (seller) => seller.user)
  seller!: Seller;

  @OneToOne(() => Client, (client) => client.user)
  client!: Client;
}
