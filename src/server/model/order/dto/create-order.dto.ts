import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { OrderProduct } from "../../order-product/entities/order-product.entity";
import { User } from "../../user/entities/user.entity";
import { OrderStatus } from "../entities/order.entity";

export class CreateOrderDto {
@ApiProperty({
    example: 'PENDING'
})
@IsEnum(OrderStatus, {
    message: 'Valid Status required',
  })
status: OrderStatus;


@ApiProperty({
    example: 4
})
@IsNotEmpty()
quantity: number;


@ApiProperty({
    example: 300
})
@IsNotEmpty()
amount: number;


@ApiProperty({
    example: 3
})
customer: User;


@ApiProperty({
    example: []
})
products: OrderProduct[];

}


