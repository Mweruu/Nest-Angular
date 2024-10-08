import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductService } from './order-product.service';
import { OrderProduct } from './entities/order-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockDatabaseService } from '../../../../test/mock/userMockData';

describe('OrderProductService', () => {
  let service: OrderProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderProductService,
        {
          provide: getRepositoryToken(OrderProduct),
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<OrderProductService>(OrderProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
