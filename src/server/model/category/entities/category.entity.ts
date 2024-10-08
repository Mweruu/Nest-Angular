import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  icon: string;

  @OneToMany(() => Product, (products) => products.id)
  products: Product[];

  @CreateDateColumn()
  createdAt: string;

  @CreateDateColumn()
  updatedAt: string;
}
