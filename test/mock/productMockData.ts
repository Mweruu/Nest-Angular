import { UpdateProductDto } from "../../src/server/model/products/dto/update-product.dto";
import { Category } from "../../src/server/model/category/entities/category.entity";
import { InventoryStatus, Product } from "../../src/server/model/products/entities/product.entity";
import { Role } from "../../src/server/model/user/entities/user.entity";
import { OrderStatus } from "../../src/server/model/order/entities/order.entity";

const mockProductRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
};

const mockDatabaseService = {
    create: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
};


const newProduct = {
    name: 'Desk',
    price: 3,
    quantity: 5,
    description:'Desk',
    code:  'Trb564CQ1',
    category: [
        {   'id': 1,
            'name':'Home and Office', 
            'color': 'Green', 
            'icon': 'Desktop',
            'products': [],
            'createdAt': '2024-07-25T15:06:54.451Z',
            'updatedAt': '2024-07-25T15:06:54.451Z'
        }
    ],
    inventoryStatus: 'LOWSTOCK',
    customer: [],
    message: 'Product Created',

};

const createdProduct = {
    id: 1,
    ...newProduct,
};

const products = [
    {
        id: 10,
        inventoryStatus: InventoryStatus.LOWSTOCK,
        name: 'Denim',
        price: 1500,
        code: 'fTH6frgvcv',
        quantity: 15,
        description: 'trousers',
        createdAt: '2024-07-26T07:31:17.846Z',
        updatedAt: '2024-07-26T07:31:17.846Z',
        customer: null,
        orderProduct: {
            id: 1,
            quantity: 2,
            amount: 300,
            order:{ 
                    id: 6,
                    status: OrderStatus.PENDING,
                    quantity: 9,
                    amount: 1000,
                    createdAt: '2024-07-26T07:13:44.339Z',
                    updatedAt: '2024-07-26T07:13:44.339Z',
                    customer: null,
                    products: [],
                },
            products: [],
            createdAt: '2024-07-26T11:55:52.500Z',
            updatedAt: '2024-07-26T11:55:52.500Z',
        },
        category: {
            id: 1,
            name: 'Desktop',
            color: 'green',
            icon: 'desktop',
            products: [],
            createdAt: '2024-07-25T15:06:54.451Z',
            updatedAt: '2024-07-25T15:06:54.451Z',
        },
    },
]

const existingProduct = new Product();
    existingProduct.id = 1,
    existingProduct.category = {           
        id: 1,
        name: 'Desktop',
        color: 'green',
        icon: 'desktop',
        products: [],
        createdAt: '2024-07-25T15:06:54.451Z',
        updatedAt: '2024-07-25T15:06:54.451Z',},
    existingProduct.code = 'fTH6frgvcv',
    existingProduct.customer = 
        {
            "id": 1,
            "firstName": "Jane",
            "lastName": "Jane",
            "email": "jane@gmail.com",
            "role": Role.ADMIN,
            "orders": [],
            "products": [],
            "password": "Mweru123",
            createdAt: '2024-07-25T15:06:54.451Z',
            updatedAt: '2024-07-25T15:06:54.451Z',
            }
    existingProduct.inventoryStatus = InventoryStatus.LOWSTOCK,
    existingProduct.quantity = 6,
    existingProduct.price = 300,
    existingProduct.name ='Desk'


const updatedProduct = { ...existingProduct, ...UpdateProductDto };

const productId = 1

export {
    mockProductRepository,
    mockDatabaseService,
    newProduct,
    createdProduct,
    products,
    existingProduct,
    updatedProduct,
    productId,
};