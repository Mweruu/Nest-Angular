import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductService } from './order-product.service';
import { OrderProduct } from './entities/order-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockOrderRepository } from '../../../../test/mock/orderMockData';

describe('OrderProductService', () => {
  let service: OrderProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderProductService,
        {
          provide: getRepositoryToken(OrderProduct),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<OrderProductService>(OrderProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    // it('should create a new orderproduct', () => {})
  });

  describe('findall', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
    
    // it('should return all orderproducts', () => {})
  });

  describe('findone', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    // it('should return an orderproduct with the given id', () => {})

  });


  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    // it('', () => {})

  });


  describe('remove', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    // it('', () => {})

  });
});
