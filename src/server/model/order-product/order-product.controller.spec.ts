import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductController } from './order-product.controller';
import { OrderProductService } from './order-product.service';
import { OrderProduct } from './entities/order-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { existingOrderproduct, mockOrderProductRepository, newOrderProduct, orderProductId, orderProducts, updatedOrderProduct } from '../../../../test/mock/orderProductMockData';

describe('OrderProductController', () => {
  let controller: OrderProductController;
  let orderProductService: OrderProductService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderProductController],
      providers: [
        OrderProductService,
        {
          provide: getRepositoryToken(OrderProduct),
          useValue: mockOrderProductRepository,
        },
      ],
    }).compile();

    controller = module.get<OrderProductController>(OrderProductController);
    orderProductService = module.get<OrderProductService>(OrderProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () =>{
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should create an op', async () => {
      jest.spyOn(orderProductService, 'create').mockResolvedValue(newOrderProduct);
      const response = await controller.create(newOrderProduct);
      expect(response).toEqual(newOrderProduct);
      expect(orderProductService.create).toHaveBeenCalled();
      expect(orderProductService.create).toHaveBeenCalledWith(newOrderProduct);
    });
  });

  describe('findall', () =>{
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should findall ops', async () => {
      jest.spyOn(orderProductService, 'findAll').mockResolvedValue(orderProducts);
      const response = await controller.findAll();
      expect(response).toEqual(orderProducts);
      expect(orderProductService.findAll).toHaveBeenCalled();
    });
  });

  describe('findone', () =>{
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should find op with given id', async () => {
      jest.spyOn(orderProductService, 'findOne').mockResolvedValue(existingOrderproduct);
      const response = await controller.findOne(orderProductId);
      expect(response).toEqual(existingOrderproduct);
      expect(orderProductService.findOne).toHaveBeenCalled();
      expect(orderProductService.findOne).toHaveBeenCalledWith(orderProductId);
    });
  });

  describe('update', () =>{
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should', async () => {
      jest.spyOn(orderProductService, 'update').mockResolvedValue(updatedOrderProduct);
      const response = await controller.update(orderProductId, updatedOrderProduct);
      expect(response).toEqual(updatedOrderProduct);
      expect(orderProductService.update).toHaveBeenCalled();
      expect(orderProductService.update).toHaveBeenCalledWith(orderProductId, updatedOrderProduct);
    });
  });

  describe('remove', () =>{
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('should', async () => {
      jest.spyOn(orderProductService, 'remove').mockResolvedValue(undefined);
      const response = await controller.remove(orderProductId);
      expect(response).toEqual(undefined);
      expect(orderProductService.remove).toHaveBeenCalled();
      expect(orderProductService.remove).toHaveBeenCalledWith(orderProductId);
    });
  });
});
