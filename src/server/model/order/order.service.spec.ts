import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createdOrder, existingOrder, mockOrderRepository, newOrder, orderId, orders, updatedOrder } from '../../../../test/mock/orderMockData';
import { CreateOrderDto } from './dto/create-order.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

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
      expect(response).toEqual({ message: 'Order Created', id: orderId });
      expect(mockOrderRepository.create).toHaveBeenCalled();
      expect(mockOrderRepository.create).toHaveBeenCalledWith(newOrder)
      expect(mockOrderRepository.save).toHaveBeenCalled();
      expect(mockOrderRepository.save).toHaveBeenCalledWith(createdOrder)
    })


    it('should throw an InternalServerErrorException if save fails', async () => {
      const newOrder = { status: 'None', amount: 100, quantity:4, products:[], customer:[] } as unknown as CreateOrderDto;

      mockOrderRepository.create.mockReturnValue(newOrder);
      mockOrderRepository.save.mockRejectedValue(new Error('Database Error'));

      await expect(service.create(newOrder)).rejects.toThrow(InternalServerErrorException);
      expect(mockOrderRepository.create).toHaveBeenCalledWith(newOrder);
      expect(mockOrderRepository.save).toHaveBeenCalledWith(newOrder);
    });
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
      mockOrderRepository.findOne.mockResolvedValue(existingOrder);
      const response = await service.findOne(orderId);
      expect(response).toEqual(existingOrder);
      expect(mockOrderRepository.findOne).toHaveBeenCalled();
      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({
        where: { id: orderId },
        relations: ['customer', 'products'],      
      });
    });

    it('should throw a NotFoundException when the product does not exist', async () => {
      mockOrderRepository.findOne.mockResolvedValue(undefined);
      await expect(service.findOne(orderId)).rejects.toThrow(NotFoundException);
      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({
        where: { id: orderId },
        relations: ['customer', 'products'],
      });
    });

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

    it('should throw an error if category id is not found', async () => {
      mockOrderRepository.findOneBy.mockResolvedValue(undefined);
      await expect(service.update(orderId, existingOrder)).rejects.toThrow(NotFoundException);
    });

  });


  describe('remove', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should delete an entity successfully when it exists', async () => {
      mockOrderRepository.delete.mockResolvedValue({ affected: 1 });
      await service.remove(orderId); 
      expect(mockOrderRepository.delete).toHaveBeenCalledWith(orderId);
    });

    it('should throw a NotFoundException when the entity does not exist', async () => {
      mockOrderRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
      expect(mockOrderRepository.delete).toHaveBeenCalledWith(1);
    });

  });
});
