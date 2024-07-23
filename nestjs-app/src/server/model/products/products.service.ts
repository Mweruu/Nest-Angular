import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/server/database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createProductDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.databaseService.product.findMany({
      include: {
        category: true,
        orders: {
          include: {
            order: { include: { customer: true } },
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.databaseService.product.findUnique({
      where: { id },
      include: {
        category: true,
        orders: {
          include: {
            order: true,
          },
        },
      },
    });
  }

  findCategory(catId: number) {
    return this.databaseService.product.findMany({
      where: { catId },
      include: {
        category: true,
        orders: {
          include: {
            order: true,
          },
        },
      },
    });
  }

  update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.databaseService.product.delete({
      where: { id },
    });
  }
}
