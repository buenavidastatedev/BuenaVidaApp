import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('settlement_configs')
export class SettlementConfig {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'decimal',
        precision: 5,
        scale: 2,
        default: 5,
    })
    commissionPercentage!: number;

    @Column({
        type: 'decimal',
        precision: 5,
        scale: 2,
        default: 19,
    })
    ivaPercentage!: number;

    @Column({
        type: 'boolean',
        default: true,
    })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}