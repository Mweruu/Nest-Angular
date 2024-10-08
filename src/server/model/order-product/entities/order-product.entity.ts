import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.id)
  order: Order;

  @ManyToOne(() => Product, (products) => products.id)
  products: Product[];

  @Column()
  quantity: number;

  @Column()
  amount: number;

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;
}
