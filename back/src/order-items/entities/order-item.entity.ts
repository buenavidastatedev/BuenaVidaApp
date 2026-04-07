import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('order_items')

export class OrderItem {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * Pedido al que pertenece el item
     */
    @ManyToOne(() => Order, (order) => order.items, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'orderId' })
    order: Order;

    /**
     * Producto asociado al item
     */
    @ManyToOne(() => Product, (product) => product.orderItems, {
        nullable: false,
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'productId' })
    product: Product;

    /**
     * Cantidad pedida
     */
    @Column({ type: 'int' })
    quantity: number;

    /**
     * Precio unitario al momento del pedido
     * Se guarda acá para no depender del precio actual del producto
     */
    @Column({ type: 'numeric', precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
