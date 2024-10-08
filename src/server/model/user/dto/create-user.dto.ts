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
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {  // Add Examples
  @ApiProperty({
    example: 'Jane',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string; 

  @ApiProperty({
    example: 'Jane',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'jane@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'ADMIN',
  })
  @IsEnum(Role, {
    message: 'Valid Role required',
  })
  role: Role;

  @ApiProperty({
    example: [],
  })
  orders: Order[];

  @ApiProperty({
    example: [],
  })
  products: Product[];

  @ApiProperty({
    example: 'Mweru123',
  })
  @IsAlphanumeric()
  password: string;
}
