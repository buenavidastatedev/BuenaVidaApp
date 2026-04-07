import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { OrderItem } from '../../order-items/entities/order-item.entity';

@Entity('products')


export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'varchar', length: 150 })
    winery: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int', default: 0 })
    stock: number;

    /**
     * Relación con items de pedidos
     */
    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems: OrderItem[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
