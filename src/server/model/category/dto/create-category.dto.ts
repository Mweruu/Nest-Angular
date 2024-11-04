import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";
import { Product } from "../../products/entities/product.entity";

export class CreateCategoryDto {
    @ApiProperty({
        example: 'Desktop',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'Blue',
    })
    @IsString()
    @IsNotEmpty()
    color: string;
    @ApiProperty({
    example: 'List',
    })
    @IsString()
    @IsNotEmpty()
    icon: string;

    @ApiProperty({
    example: 2,
    })
    products: Product[];

}
