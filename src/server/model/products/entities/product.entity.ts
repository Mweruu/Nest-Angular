import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
// import { User } from '../../user/entities/user.entity';
import { OrderProduct } from '../../order-product/entities/order-product.entity';

export enum InventoryStatus {
  INSTOCK = 'INSTOCK',
  LOWSTOCK = 'LOWSTOCK',
  OUTOFSTOCK = 'OUTOFSTOCK',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  // @ManyToOne(() => User, (customer) => customer.products)
  // customer: User;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.products)
  orderProduct: OrderProduct;

  @Column({
    type: 'enum',
    enum: InventoryStatus,
    default: InventoryStatus.LOWSTOCK,
  })
  inventoryStatus: InventoryStatus;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  code: string;

  @Column()
  quantity: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
