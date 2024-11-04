import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createdProduct, existingProduct, mockProductRepository, newProduct, productId, products, updatedProduct } from '../../../../test/mock/productMockData';
import { CreateProductDto } from './dto/create-product.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Category } from '../category/entities/category.entity';
import { OrderProduct } from '../order-product/entities/order-product.entity';
import { User } from '../user/entities/user.entity';

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
      expect(result).toEqual({ message: 'Product Created',id: productId });
      expect(mockProductRepository.create).toHaveBeenCalledWith(newProduct);
      expect(mockProductRepository.create).toHaveBeenCalled();
      expect(mockProductRepository.save).toHaveBeenCalledWith(createdProduct);
    });

    it('should throw an InternalServerErrorException if save fails', async () => {
      const newProduct = { name: 'Test Product', price: 100 } as CreateProductDto;

      mockProductRepository.create.mockReturnValue(newProduct);
      mockProductRepository.save.mockRejectedValue(new Error('Database Error'));

      await expect(service.create(newProduct)).rejects.toThrow(InternalServerErrorException);
      expect(mockProductRepository.create).toHaveBeenCalledWith(newProduct);
      expect(mockProductRepository.save).toHaveBeenCalledWith(newProduct);
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

    it('should return a specific product', async () => {
      mockProductRepository.findOne.mockResolvedValue(existingProduct);
      const response = await service.findOne(productId);
      expect(response).toEqual(existingProduct);
      expect(mockProductRepository.findOne).toHaveBeenCalled();
      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: productId },
        relations: ['category', 'customer'],
      });
    });

    it('should throw a NotFoundException when the product does not exist', async () => {
      mockProductRepository.findOne.mockResolvedValue(undefined);
      await expect(service.findOne(productId)).rejects.toThrow(NotFoundException);
      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['category', 'customer'],
      });
    });

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

    it('should throw an error if category id is not found', async () => {
      mockProductRepository.findOneBy.mockResolvedValue(undefined);
      await expect(service.update(productId, existingProduct)).rejects.toThrow(NotFoundException);
    });

  });

  describe('remove product with the given id', () => {
    it('should be defined', () =>{
      expect(service.remove).toBeDefined();
    });

    it('should delete an entity successfully when it exists', async () => {
      mockProductRepository.delete.mockResolvedValue({ affected: 1 });
      await service.remove(productId); 
      expect(mockProductRepository.delete).toHaveBeenCalledWith(productId);
    });

    it('should throw a NotFoundException when the entity does not exist', async () => {
      mockProductRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
      expect(mockProductRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('Order Entity Relationships', () => {
    let product: Product;

    beforeEach(() => {
      product = new Product();
    });

    it('should have a ManyToOne relationship with Category', () => {
        const category = new Category();
        product.category = category;

        expect(product.category).toBe(category);
        expect(product.category).toBeInstanceOf(Category);
    });

    it('should have a ManyToOne relationship with User as customer', () => {
        const customer = new User();
        product.customer = customer;

        expect(product.customer).toBe(customer);
        expect(product.customer).toBeInstanceOf(User);
    });

    // it('should have a OneToMany relationship with OrderProduct', () => {
    //     const orderProduct1 = new OrderProduct();
    //     const orderProduct2 = new OrderProduct();
    //     product.orderProduct = [orderProduct1, orderProduct2];

    //     expect(product.orderProduct).toContain(orderProduct1);
    //     expect(product.orderProduct).toContain(orderProduct2);
    //     expect(product.orderProduct[0]).toBeInstanceOf(OrderProduct);
    //     expect(product.orderProduct.length).toBe(2);
    // });
});
});
