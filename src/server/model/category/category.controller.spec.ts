import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { categories, categoryId, existingCategory, mockCategoryRepository, newCategory, updatedCategory } from '../../../../test/mock/CategoryMockData';

describe('CategoryController', () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockCategoryRepository,
        },
      ],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create category', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should create a new category', async () => {
      jest.spyOn(categoryService, 'create').mockResolvedValue(newCategory);
      const response = await controller.create(newCategory);
      expect(response).toEqual(newCategory);
      expect(categoryService.create).toHaveBeenCalled();
      expect(categoryService.create).toHaveBeenCalledWith(newCategory);
    });
  });

  describe('find all categories', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });

    it('should create a new category', async () => {
      jest.spyOn(categoryService, 'findAll').mockResolvedValue(categories);
      const response = await controller.findAll();
      expect(response).toEqual(categories);
      expect(categoryService.findAll).toHaveBeenCalled();
    });
  });

  describe('find a category with the given id', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it('should find a category', async () => {
      jest.spyOn(categoryService, 'findOne').mockResolvedValue(existingCategory);
      const response = await controller.findOne(categoryId);
      expect(response).toEqual(existingCategory);
      expect(categoryService.findOne).toHaveBeenCalled();
      expect(categoryService.findOne).toHaveBeenCalledWith(categoryId)
    });
  });

  describe('update category', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });

    it('should update an existing category', async () => {
      jest.spyOn(categoryService, 'update').mockResolvedValue(updatedCategory);
      const response = await controller.update(categoryId, updatedCategory);
      expect(response).toEqual(updatedCategory);
      expect(categoryService.update).toHaveBeenCalled();
      expect(categoryService.update).toHaveBeenCalledWith(categoryId, updatedCategory)
    });
  });

  describe('delete category', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });

    it('should create a new category', async () => {
      jest.spyOn(categoryService, 'remove').mockResolvedValue(undefined);
      const response = await controller.remove(categoryId);
      expect(response).toEqual(undefined);
      expect(categoryService.remove).toHaveBeenCalled();
      expect(categoryService.remove).toHaveBeenCalledWith(categoryId)
    });
  });
});
