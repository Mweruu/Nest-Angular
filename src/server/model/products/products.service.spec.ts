import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockDatabaseService } from '../../../../test/mock/userMockData';
import { createdProduct, existingProduct, mockProductRepository, newProduct, productId, products, updatedProduct } from '../../../../test/mock/productMockData';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create Product Service', () => {
    it('should be defined', () =>{
      expect(service.create).toBeDefined();
    });

    it('should create a new product and return a message', async () => {
      mockProductRepository.create.mockReturnValue(createdProduct);
      mockProductRepository.save.mockResolvedValue(createdProduct);
      const result = await service.create(newProduct as unknown as CreateProductDto);
      expect(result).toEqual({ message: 'Product Created' });
      expect(mockProductRepository.create).toHaveBeenCalledWith(newProduct);
      expect(mockProductRepository.create).toHaveBeenCalled();
      expect(mockProductRepository.save).toHaveBeenCalledWith(createdProduct);
    });
  });

  describe('find all products', () => {
    it('should be defined', () =>{
      expect(service.findAll).toBeDefined();
    });

    it('should return an array of products', async () => {
      mockProductRepository.find.mockResolvedValue(products);
      const response = await service.findAll()
      expect(response).toEqual(products)
      expect(mockProductRepository.find).toHaveBeenCalled()
    })
  });

  describe('find product with the given id', () => {
    it('should be defined', () =>{
      expect(service.findOne).toBeDefined();
    });

    // it('should return a specific product', async () => {
    //   mockProductRepository.findOneBy.mockResolvedValue(existingProduct);
    //   const response = await service.findOne(productId);
    //   expect(response).toEqual(existingProduct);
    //   expect(mockProductRepository.findOneBy).toHaveBeenCalled();
    //   expect(mockProductRepository.findOneBy).toHaveBeenCalledWith(productId);
    // });
  });

  describe('update product with the given id', () => {
    it('should be defined', () =>{
      expect(service.update).toBeDefined();
    });


    it('should update product', async () => {
      mockProductRepository.findOneBy.mockResolvedValue(existingProduct);
      mockProductRepository.save.mockResolvedValue(updatedProduct);
      const response = await service.update(productId, existingProduct);
      expect(response).toEqual(updatedProduct);
      expect(mockProductRepository.findOneBy).toHaveBeenCalled();
      expect(mockProductRepository.findOneBy).toHaveBeenCalledWith({"id":productId});
      expect(mockProductRepository.save).toHaveBeenCalled();
      expect(mockProductRepository.save).toHaveBeenCalledWith(updatedProduct);
    })


  });

  describe('remove product with the given id', () => {
    it('should be defined', () =>{
      expect(service.remove).toBeDefined();
    });

    it('should delete a product', async () => {
      mockProductRepository.findOneBy.mockResolvedValue(existingProduct);
      mockProductRepository.delete.mockResolvedValue(existingProduct);
      const response = await service.remove(productId);
      console.log("response", response)
      expect(response).toEqual(undefined);
      expect(mockProductRepository.findOneBy).toHaveBeenCalled();
      expect(mockProductRepository.findOneBy).toHaveBeenCalledWith({"id":productId});
      expect(mockProductRepository.delete).toHaveBeenCalled();
      expect(mockProductRepository.delete).toHaveBeenCalledWith(existingProduct);   
    });
  });
});
