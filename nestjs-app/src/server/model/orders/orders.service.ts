import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/server/database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createOrderDto: Prisma.OrderCreateInput) {
    return this.databaseService.order.create({
      data: createOrderDto,
    });
  }

  findAll() {
    return this.databaseService.order.findMany({
      include: {
        products: true,
        customer: true,
      },
    });
  }

  findOne(id: number) {
    return this.databaseService.order.findUnique({
      where: { id },
    });
  }

  update(id: number, updateOrderDto: Prisma.OrderUpdateInput) {
    return this.databaseService.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  remove(id: number) {
    return this.databaseService.order.delete({
      where: { id },
    });
  }
}
