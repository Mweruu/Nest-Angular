import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductService } from './order-product.service';
import { OrderProduct } from './entities/order-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createdOrderProduct, existingOrderproduct, mockOrderProductRepository, newOrderProduct, orderProductId, orderProducts, updatedOrderProduct } from '../../../../test/mock/orderProductMockData';
import { NotFoundException } from '@nestjs/common';

describe('OrderProductService', () => {
  let service: OrderProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderProductService,
        {
          provide: getRepositoryToken(OrderProduct),
          useValue: mockOrderProductRepository,
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

    it('should create a new orderproduct', async () => {
      mockOrderProductRepository.create.mockReturnValue(createdOrderProduct);
      mockOrderProductRepository.save.mockResolvedValue(createdOrderProduct);
      const response = await service.create(newOrderProduct); 
      expect(response).toEqual({ message: 'Order Product Created', id: orderProductId });
      expect(mockOrderProductRepository.create).toHaveBeenCalled();
      expect(mockOrderProductRepository.create).toHaveBeenCalledWith(newOrderProduct);
      expect(mockOrderProductRepository.save).toHaveBeenCalled();
      expect(mockOrderProductRepository.save).toHaveBeenCalledWith(createdOrderProduct);
    });
  });

  describe('findall', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
    
    it('should return all orderproducts', async () => {
      mockOrderProductRepository.find.mockResolvedValue(orderProducts);
      const response = await service.findAll();
      expect(response).toEqual(orderProducts);
      expect(mockOrderProductRepository.find).toHaveBeenCalled();
    })
  });

  describe('findone', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should return an orderproduct with the given id', async () => {
      mockOrderProductRepository.findOne.mockResolvedValue(existingOrderproduct);
      const response = await service.findOne(orderProductId);
      expect(response).toEqual(existingOrderproduct);
      expect(mockOrderProductRepository.findOne).toHaveBeenCalled();
      expect(mockOrderProductRepository.findOne).toHaveBeenCalledWith({
        where: {id: orderProductId},
        relations: ['order', 'products'],
      }); 
    })

    it('should return NotFoundException if specified id is not found', async () => {
      mockOrderProductRepository.findOne.mockResolvedValue(undefined);
      await expect(service.findOne(orderProductId)).rejects.toThrow(NotFoundException);
      expect(mockOrderProductRepository.findOne).toHaveBeenCalledWith({
        where: {id: orderProductId},
        relations: ['order', 'products'],
      });
    })

  });


  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should update orderproduct with given id', async () => {
      mockOrderProductRepository.findOneBy.mockResolvedValue(existingOrderproduct);
      mockOrderProductRepository.save.mockResolvedValue(updatedOrderProduct);
      const response = await service.update(orderProductId, updatedOrderProduct);
      expect(response).toEqual(updatedOrderProduct);
      expect(mockOrderProductRepository.findOneBy).toHaveBeenCalled();
      expect(mockOrderProductRepository.findOneBy).toHaveBeenCalledWith({"id": orderProductId});
      expect(mockOrderProductRepository.save).toHaveBeenCalled();
      expect(mockOrderProductRepository.save).toHaveBeenCalledWith(updatedOrderProduct);
    });

    it('should return NotFoundException if specified id is not found', async () => {
      mockOrderProductRepository.findOneBy.mockResolvedValue(undefined);
      await expect(service.update(orderProductId, updatedOrderProduct)).rejects.toThrow(NotFoundException);
      expect(mockOrderProductRepository.findOneBy).toHaveBeenCalledWith({"id": orderProductId});
    });

  });


  describe('remove', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should delete an entity successfully when it exists', async () => {
      mockOrderProductRepository.delete.mockResolvedValue({ affected: 1 });
      await service.remove(orderProductId); 
      expect(mockOrderProductRepository.delete).toHaveBeenCalledWith(orderProductId);
    });

    it('should throw a NotFoundException when the entity does not exist', async () => {
      mockOrderProductRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
      expect(mockOrderProductRepository.delete).toHaveBeenCalledWith(1);
    });

  });
});
