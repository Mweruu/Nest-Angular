import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-product.dto';
import { UpdateOrderProductDto } from './dto/update-order-product.dto';
import { OrderProduct } from './entities/order-product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private orderProductRepository: Repository<OrderProduct>,
  ) {}
  async create(createOrderProductDto: CreateOrderProductDto) {
    const newOrderProduct = this.orderProductRepository.create(
      createOrderProductDto,
    );
    this.orderProductRepository.save(newOrderProduct);
    return { message: 'Order Product Created' };
  }

  async findAll() {
    return await this.orderProductRepository.find();
  }

  async findOne(id: number) {
    const user = await this.orderProductRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateOrderProductDto: UpdateOrderProductDto) {
    const user = await this.orderProductRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, updateOrderProductDto);
    return await this.orderProductRepository.save(user);
  }

  async remove(id: number) {
    return `This action removes a #${id} orderProduct`;
  }
}
