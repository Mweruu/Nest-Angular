import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<{ message: string }> {
    try {
      const newProduct = this.productRepository.create(createProductDto);
      console.log(newProduct);
      await this.productRepository.save(newProduct);
      return { message: `Product Created` };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async findAll() {
    return this.productRepository.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
