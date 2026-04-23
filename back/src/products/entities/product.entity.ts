import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { OrderItem } from '../../order-items/entities/order-item.entity';
import { Winery } from '../../wineries/entities/winery.entity';
import { Stock } from 'src/stock/entities/stock.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 150 })
  name!: string;

  @ManyToOne(() => Winery, (winery) => winery.products)
  winery!: Winery;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price!: number;

    @Column({ type: 'varchar', nullable: true })
  imageUrl!: string | null;
  
  @OneToMany(() => Stock, (stock) => stock.product)
  stocks!: Stock[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems!: OrderItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
