import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categories, categoryId, createdCategory, existingCategory, mockCategoryRepository, newCategory, updatedCategory } from '../../../../test/mock/CategoryMockData';
import { NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create a category', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined()
    });

    it('should return a new category', async () => {
      mockCategoryRepository.create.mockReturnValue(createdCategory);
      mockCategoryRepository.save.mockResolvedValue(createdCategory);
      const response = await service.create(newCategory);
      expect(response).toEqual({ message: 'New Category Created', id:categoryId});
      expect(mockCategoryRepository.create).toHaveBeenCalled();
      expect(mockCategoryRepository.create).toHaveBeenCalledWith(newCategory);
      expect(mockCategoryRepository.save).toHaveBeenCalled();
      expect(mockCategoryRepository.save).toHaveBeenCalledWith(createdCategory);
    });
  });

  describe('finds all categories', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should return all available categories', async () => {
      mockCategoryRepository.find.mockResolvedValue(categories);
      const response = await service.findAll();
      expect(response).toEqual(categories)
    });
  });

  describe('find category with given id', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should return category with specific id', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(existingCategory);
      const response = await service.findOne(categoryId);
      expect(response).toEqual(existingCategory);
      expect(mockCategoryRepository.findOne).toHaveBeenCalled();
      expect(mockCategoryRepository.findOne).toHaveBeenCalledWith({
        where: {id:categoryId},
        relations: ['products']
      });
    });

    it('should throw an error if category id is not found', async () => {
      mockCategoryRepository.findOne.mockResolvedValue(undefined);
      await expect(service.findOne(categoryId)).rejects.toThrow(NotFoundException);
    });

  });

  describe('update category', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });

    it('should update the category with the given id', async () => {
      mockCategoryRepository.findOneBy.mockResolvedValue(existingCategory);
      mockCategoryRepository.save.mockResolvedValue(updatedCategory);
      const response = await service.update(categoryId, updatedCategory);
      expect(response).toEqual(updatedCategory);
      expect(mockCategoryRepository.findOneBy).toHaveBeenCalled();
      expect(mockCategoryRepository.findOneBy).toHaveBeenCalledWith({"id":categoryId});
      expect(mockCategoryRepository.save).toHaveBeenCalled();
      expect(mockCategoryRepository.save).toHaveBeenCalledWith(updatedCategory);
    });

    it('should throw an error if category id is not found', async () => {
      mockCategoryRepository.findOneBy.mockResolvedValue(undefined);
      await expect(service.update(categoryId, updatedCategory)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete category', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });

    it('should be delete the category with given id', async () => {
      mockCategoryRepository.delete.mockResolvedValue({ affected: 1 });
      await service.remove(categoryId);
      expect(mockCategoryRepository.delete).toHaveBeenCalledWith(categoryId);
    });


    it('should throw a NotFoundException when the category does not exist', async () => {
      mockCategoryRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
      expect(mockCategoryRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
