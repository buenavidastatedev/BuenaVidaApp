import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Client } from '../../clients/entities/client.entity';
import { Seller } from '../../sellers/entities/seller.entity';
import { OrderItem } from '../../order-items/entities/order-item.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
import { OrderStatus } from '../../common/decorators/guards/filters/interceptors/enums/order-status.enum'; 

@Entity('orders')

export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Client, (client) => client.orders, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'clientId' })
    client: Client;

    @ManyToOne(() => Seller, (seller) => seller.orders, {
        nullable: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'sellerId' })
    seller: Seller | null;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    })
    status: OrderStatus;

    @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
    total: number;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
        cascade: true,
    })
    items: OrderItem[];

    @OneToOne(() => Invoice, (invoice) => invoice.order, {
        nullable: true,
    })
    invoice: Invoice;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
