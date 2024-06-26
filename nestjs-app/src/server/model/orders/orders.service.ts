import { Injectable } from '@nestjs/common';
// import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  // create(createOrderDto: Prisma.CategoryCreateInput) {
  //   return 'This action adds a new order';
  // }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  // update(id: number, updateOrderDto:Prisma.CategoryCreateInput) {
  //   return `This action updates a #${id} order`;
  // }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
