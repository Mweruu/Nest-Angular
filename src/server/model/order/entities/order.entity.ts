import {
  Column,
  CreateDateColumn,
  Entity,
  // ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderProduct } from '../../order-product/entities/order-product.entity';
// import { User } from '../../user/entities/user.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED',
}
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: OrderStatus;

  @Column()
  quantity: number;

  @Column()
  amount: number;

  // @ManyToOne(() => User, (customer) => customer.orders)
  // customer: User;

  @OneToMany(() => OrderProduct, (products) => products.order)
  products: OrderProduct[];

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;
}
