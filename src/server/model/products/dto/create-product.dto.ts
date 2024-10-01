import { IsAlphanumeric, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { InventoryStatus } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;

  @IsAlphanumeric()
  code: string;

  //   category;

  @IsEnum(InventoryStatus, {
    message: 'Valid status required',
  })
  inventoryStatus: InventoryStatus;
}
