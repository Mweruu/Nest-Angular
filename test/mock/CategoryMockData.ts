import { UpdateCategoryDto } from "../../src/server/model/category/dto/update-category.dto";
import { Category } from "../../src/server/model/category/entities/category.entity";

const mockCategoryRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
};

const categoryId = 1

const newCategory= {
    name: "Desktop",
    color: "Blue",
    icon: "List",
    products: [],
    message: 'New Category Created',
    id: categoryId
}
const createdCategory= {
    id: 1,
    ...newCategory
};

const categories= [];
const existingCategory = new Category();
const updatedCategory = { ...existingCategory, ...UpdateCategoryDto };



export { 
    mockCategoryRepository,
    newCategory,
    createdCategory,
    categories,
    existingCategory,
    updatedCategory,
    categoryId
}
