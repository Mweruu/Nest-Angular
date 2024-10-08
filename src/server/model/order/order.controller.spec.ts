import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockDatabaseService } from '../../../../test/mock/userMockData';
import { Order } from './entities/order.entity';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
