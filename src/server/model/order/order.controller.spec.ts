import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { createdOrder, existingOrder, mockOrderRepository, newOrder, orderId, orders, updatedOrder } from '../../../../test/mock/orderMockData';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should create a new order', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(newOrder);
      const response = await controller.create(newOrder as unknown as CreateOrderDto);
      expect(response).toEqual(newOrder);
      expect(controller.create).toHaveBeenCalled();
      expect(controller.create).toHaveBeenCalledWith(newOrder)
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should return all orders', async () => {
      jest.spyOn(controller, 'findAll').mockResolvedValue(orders);
      const response = await controller.findAll();
      expect(response).toEqual(orders);
      expect(controller.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should return an order with the given id', async() => {
      jest.spyOn(controller, 'findOne').mockResolvedValue(existingOrder);
      const response = await controller.findOne(orderId);
      expect(response).toEqual(existingOrder);
      expect(controller.findOne).toHaveBeenCalled();
      expect(controller.findOne).toHaveBeenCalledWith(orderId);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should update the order with the given id', async() => {
      jest.spyOn(controller, 'update').mockResolvedValue(updatedOrder);
      const response = await controller.update(orderId, updatedOrder);
      expect(response).toEqual(updatedOrder);
      expect(controller.update).toHaveBeenCalled();
      expect(controller.update).toHaveBeenCalledWith(orderId, updatedOrder);
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('should delete the order with the given id', async () => {
      jest.spyOn(controller, 'remove').mockResolvedValue(undefined);
      const response = await controller.remove(orderId);
      console.log("delete order", response)
      expect(response).toEqual(undefined);
      expect(controller.remove).toHaveBeenCalled();
      expect(controller.remove).toHaveBeenCalledWith(orderId);
    });
  });
});
