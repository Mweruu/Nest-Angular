import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockDatabaseService } from '../../../../test/mock/userMockData';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
