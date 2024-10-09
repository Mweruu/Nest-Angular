import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { existingProduct, mockProductRepository, newProduct, productId, products, updatedProduct } from './../../../../test/mock/productMockData';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Product), useValue: mockProductRepository },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });
    it('should create a new product', async () => {
      jest.spyOn(controller, 'create').mockResolvedValue(newProduct);
      const result = await controller.create(newProduct as unknown as CreateProductDto);
      expect(result).toEqual(newProduct);
      expect(controller.create).toHaveBeenCalled();
      expect(controller.create).toHaveBeenCalledWith(newProduct);
    });

  });

  describe('findall', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });
    it('should return all available products', async() => {
      jest.spyOn(controller, 'findAll').mockResolvedValue(products);
      const response = await controller.findAll();
      expect(response).toEqual(products);
      expect(controller.findAll).toHaveBeenCalled();
    });
  });

  describe('findone', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should return a product with the given id', async () => {
      jest.spyOn(controller, 'findOne').mockResolvedValue(existingProduct);
      const response = await controller.findOne(productId);
      expect(response).toEqual(existingProduct);
      expect(controller.findOne).toHaveBeenCalled();
      expect(controller.findOne).toHaveBeenCalledWith(productId)
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
    it('should update the product with the given id', async () => {
      jest.spyOn(controller, 'update').mockResolvedValue(updatedProduct);
      const response = await controller.update(productId, updatedProduct)
      expect(response).toEqual(updatedProduct);
      expect(controller.update).toHaveBeenCalled();
      expect(controller.update).toHaveBeenCalledWith(productId, updatedProduct)
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });
    it('should delete a product', async () => {
      jest.spyOn(controller, 'remove').mockResolvedValue(undefined);
      const response = await controller.remove(productId);
      console.log("response", response)
      expect(response).toEqual(undefined);
      expect(response).toBeUndefined();
      expect(controller.remove).toHaveBeenCalled();
      expect(controller.remove).toHaveBeenCalledWith(productId);
    });
  });
});
