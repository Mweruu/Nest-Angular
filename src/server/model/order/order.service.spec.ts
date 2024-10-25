import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createdOrder, existingOrder, mockOrderRepository, newOrder, orderId, orders, updatedOrder } from '../../../../test/mock/orderMockData';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should create a new order', async () => {
      mockOrderRepository.create.mockReturnValue(createdOrder);
      mockOrderRepository.save.mockResolvedValue(createdOrder);
      const response = await service.create(newOrder as unknown as CreateOrderDto);
      expect(response).toEqual({ message: 'Order created' });
      console.log("mock", mockOrderRepository.create.mock)
      expect(mockOrderRepository.create).toHaveBeenCalled();
      expect(mockOrderRepository.create).toHaveBeenCalledWith(newOrder)
      expect(mockOrderRepository.save).toHaveBeenCalled();
      expect(mockOrderRepository.save).toHaveBeenCalledWith(createdOrder)
    })
  });

  describe('findall', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
    
    it('should return all orders', async () => {
      mockOrderRepository.find.mockResolvedValue(orders);
      const response = await service.findAll();
      expect(response).toEqual(orders);
      expect(mockOrderRepository.find).toHaveBeenCalled()
    })
  });

  describe('findone', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should return an order with the given id', async () => {
      mockOrderRepository.findOneBy.mockResolvedValue(existingOrder);
      const response = await service.findOne(orderId);
      expect(response).toEqual(existingOrder);
      expect(mockOrderRepository.findOneBy).toHaveBeenCalled();
      expect(mockOrderRepository.findOneBy).toHaveBeenCalledWith({"id":orderId});
    })

  });


  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should update the order with the given id', async () => {
      mockOrderRepository.findOneBy.mockResolvedValue(existingOrder);
      mockOrderRepository.save.mockResolvedValue(existingOrder);
      const response = await service.update(orderId, existingOrder)
      expect(response).toEqual(updatedOrder)
      expect(mockOrderRepository.findOneBy).toHaveBeenCalled();
      expect(mockOrderRepository.findOneBy).toHaveBeenCalledWith({"id":orderId});
      expect(mockOrderRepository.save).toHaveBeenCalled();
      expect(mockOrderRepository.save).toHaveBeenCalledWith(existingOrder);

    })

  });


  describe('remove', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should delete the order with the given id', async () => {
      mockOrderRepository.findOneBy.mockResolvedValue(existingOrder);
      mockOrderRepository.delete.mockResolvedValue(undefined);
      const response = await service.remove(orderId);
      expect(response).toEqual(undefined);
      expect(mockOrderRepository.findOneBy).toHaveBeenCalled();
      expect(mockOrderRepository.findOneBy).toHaveBeenCalledWith({"id":orderId});
      expect(mockOrderRepository.delete).toHaveBeenCalled();
      expect(mockOrderRepository.delete).toHaveBeenCalledWith(existingOrder);
    })

  });
});
