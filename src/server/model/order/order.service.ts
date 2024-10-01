import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const newOrder = this.orderRepository.create(createOrderDto);
      console.log(newOrder);
      return this.orderRepository.save(newOrder);
      // return { message: 'Order created' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async findAll() {
    return this.orderRepository.find({ relations: ['customer'] });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    Object.assign(order, updateOrderDto);
    return await this.orderRepository.save(order);
  }

  async remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
