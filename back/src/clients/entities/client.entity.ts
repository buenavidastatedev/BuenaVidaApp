import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { Seller } from '../../sellers/entities/seller.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address!: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone!: string;

  /**
   * Un cliente tiene un único user para iniciar sesión
   */
  @OneToOne(() => User, (user) => user.client, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user!: User;

  /**
   * Un cliente puede tener seller asignado o no
   */
  @ManyToOne(() => Seller, (seller) => seller.clients, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'sellerId' })
  seller!: Seller | null;

  /**
   * Un cliente puede tener muchos pedidos
   */
  @OneToMany(() => Order, (order) => order.client)
  orders!: Order[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
