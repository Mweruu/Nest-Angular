import { UpdateOrderProductDto } from "../../src/server/model/order-product/dto/update-order-product.dto";
import { OrderProduct } from "../../src/server/model/order-product/entities/order-product.entity";

const mockOrderProductRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
};

const newOrderProduct = {
    order:4,
    products: 2,
    quantity: 68,
    amount: 5,
    message: 'Order Product Created'
}
const createdOrderProduct= {
    id: 1,
    ...newOrderProduct
};

const orderProducts = [];
const existingOrderproduct = new OrderProduct();
const updatedOrderProduct = { ...existingOrderproduct, ...UpdateOrderProductDto };

const orderProductId = 1


export { 
    mockOrderProductRepository,
    newOrderProduct,
    createdOrderProduct,
    orderProducts,
    existingOrderproduct,
    updatedOrderProduct,
    orderProductId
}
