import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Client } from '../../clients/entities/client.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('sellers')
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /**
   * Relación 1:1 con User
   * Un seller tiene un único user
   */
  @OneToOne(() => User, (user) => user.seller, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user!: User;

  /**
   * Relación 1:N con Client
   * Un seller tiene muchos clientes
   */
  @OneToMany(() => Client, (client) => client.seller)
  clients!: Client[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Order, (order) => order.seller)
  orders!: Order[];
}
