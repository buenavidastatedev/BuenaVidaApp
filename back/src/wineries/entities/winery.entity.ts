import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Product } from '../../products/entities/product.entity';
import { Seller } from 'src/sellers/entities/seller.entity';

@Entity('wineries')
export class Winery {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description!: string | null;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  imageUrl!: string | null;

  @OneToMany(() => Seller, (seller) => seller.winery)
  sellers!: Seller[];

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @OneToMany(() => Product, (product) => product.winery)
  products!: Product[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}