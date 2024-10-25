import { UpdateOrderDto } from "../../src/server/model/order/dto/update-order.dto";
import { Order, OrderStatus } from "../../src/server/model/order/entities/order.entity";

const mockOrderRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
};

const newOrder = {
    status: "PENDING",
    quantity: 4,
    amount: 300,
    customer: {},
    products: [],
    createdAt: "2024-10-09T08:44:55.727Z",
    updatedAt: "2024-10-09T08:44:55.727Z",
    message: 'Order created',

  }

const createdOrder= {
    id: 1,
    ...newOrder
}

const orders = [
    {
        id: 1,
        status: OrderStatus.PENDING,
        quantity: 4,
        amount: 300,
        createdAt: "2024-10-09T08:44:55.727Z",
        updatedAt: "2024-10-09T08:44:55.727Z",
        customer: null,
        products: [],
    }
]

const existingOrder = new Order();
    existingOrder.id = 1,
    existingOrder.status = OrderStatus.PENDING,
    existingOrder.quantity = 4,
    existingOrder.amount= 300,
    existingOrder.createdAt= "2024-10-09T08:44:55.727Z",
    existingOrder.updatedAt= "2024-10-09T08:44:55.727Z",
    existingOrder.customer= null,
    existingOrder.products= []

const orderId = 1

const updatedOrder = { ...existingOrder, ...UpdateOrderDto}

export {mockOrderRepository,newOrder, createdOrder, orders, existingOrder, orderId, updatedOrder}