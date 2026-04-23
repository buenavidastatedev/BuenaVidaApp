import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Stock } from '../../stock/entities/stock.entity';
import { User } from '../../users/entities/user.entity';

export enum MovementType {
  IN = 'IN',
  OUT = 'OUT',
}

@Entity('stock_movements')
export class StockMovement {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Stock, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'stockId' })
  stock!: Stock;

  @Column({ type: 'enum', enum: MovementType })
  type!: MovementType;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reason!: string;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'userId' })
  user!: User | null;

  @CreateDateColumn()
  createdAt!: Date;
}
