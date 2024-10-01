import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductController } from './order-product.controller';
import { OrderProductService } from './order-product.service';
import { OrderProduct } from './entities/order-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockDatabaseService } from '../../../../test/mock/userMockData';

describe('OrderProductController', () => {
  let controller: OrderProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderProductController],
      providers: [
        OrderProductService,
        {
          provide: getRepositoryToken(OrderProduct),
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    controller = module.get<OrderProductController>(OrderProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
