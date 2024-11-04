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
  async create(createOrderProductDto: CreateOrderProductDto): Promise<{ message: string, id?:number }>{
    const newOrderProduct = this.orderProductRepository.create(
      createOrderProductDto,
    );
    const savedOP = await this.orderProductRepository.save(newOrderProduct);
    return { message: 'Order Product Created', id: savedOP.id };
  }

  async findAll() {
    return await this.orderProductRepository.find({ relations: ['order', 'products'] });
  }

  async findOne(id: number) {
    const user = await this.orderProductRepository.findOne({
      where: { id },
      relations: ['order', 'products'],
    });
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
    const result = await this.orderProductRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`OP with ID ${id} not found`);
    };
  }  
}
