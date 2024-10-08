import { IsAlphanumeric, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { InventoryStatus } from '../entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../category/entities/category.entity';

export class CreateProductDto {
  @ApiProperty({
    example: 'Desk',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 3,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    example: 5,
  })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: 'Desk',
  })
  @IsString()
  @IsNotEmpty()
  description:string;

  @ApiProperty({
    example: 'Trb564CQ1',
  })
  @IsAlphanumeric()
  code: string;

  @ApiProperty({
    example: [{'name': 'Home and Office'}, {'color': 'Green'}, {'icon': 'Desktop'},],
  })
  category: Category;

  @ApiProperty({
    example: 'LOWSTOCK',
  })
  @IsEnum(InventoryStatus, {
    message: 'Valid status required',
  })
  inventoryStatus: InventoryStatus;
}
