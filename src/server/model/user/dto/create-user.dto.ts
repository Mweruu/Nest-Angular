import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Role } from '../entities/user.entity';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../products/entities/product.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(Role, {
    message: 'Valid Role required',
  })
  role: Role;

  orders: Order;
  products: Product;
  @IsAlphanumeric()
  password: string;
}
