import { Order, OrderStatus } from '../../src/server/model/order/entities/order.entity';
import { Role, User } from '../../src/server/model/user/entities/user.entity';
import { InventoryStatus, Product } from '../../src/server/model/products/entities/product.entity';

const mockUserRepository = {
  create: jest.fn(),
  createf: jest
    .fn(() => 'fn')
    .mockReturnValue('default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call'),
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

const newUser = {
  firstName: 'Jane',
  lastName: 'Jane',
  email: 'jane@example.com',
  role: 'ADMIN',
  password: 'Mweru123',
  orders: [],
  products: [],
  message: 'user created',
};

const createdUser = {
  id: 1,
  ...newUser,
};

const users = [
  // {
  //   id: 1,
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   email: 'john@gmail.com',
  //   password: 'Mweru123',
  //   role: Role.ADMIN,
  //   createdAt: '2024-07-26T07:13:44.339Z',
  //   updatedAt: '2024-07-26T07:13:44.339Z',
  //   orders: [
  //     {
  //       id: 6,
  //       status: OrderStatus.PENDING,
  //       quantity: 9,
  //       amount: 1000,
  //       createdAt: '2024-07-26T07:13:44.339Z',
  //       updatedAt: '2024-07-26T07:13:44.339Z',
  //       customer: null,
  //       products: [],
  //     },
  //   ],
  //   // products: [
  //   //   {
  //   //     id: 10,
  //   //     inventoryStatus: InventoryStatus.LOWSTOCK,
  //   //     name: 'Denim',
  //   //     price: 1500,
  //   //     code: 'fTH6frgvcv',
  //   //     quantity: 15,
  //   //     description: 'trousers',
  //   //     createdAt: '2024-07-26T07:31:17.846Z',
  //   //     updatedAt: '2024-07-26T07:31:17.846Z',
  //   //     customer: null,
  //   //     orderProduct: {
  //   //       id: 1,
  //   //       quantity: 2,
  //   //       amount: 300,
  //   //       createdAt: '2024-07-26T11:55:52.500Z',
  //   //       updatedAt: '2024-07-26T11:55:52.500Z',
  //   //     },
  //   //     category: {
  //   //       id: 1,
  //   //       name: 'Desktop',
  //   //       color: 'green',
  //   //       icon: 'desktop',
  //   //       createdAt: '2024-07-25T15:06:54.451Z',
  //   //       updatedAt: '2024-07-25T15:06:54.451Z',
  //   //     },
  //   //   },
  //   // ],
  // },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@gmail.com',
    password: 'Mweru123',
    role: Role.ENGINEER,
    createdAt: '2024-07-26T07:13:44.339Z',
    updatedAt: '2024-07-26T07:13:44.339Z',
    orders: [
      {
        id: 6,
        status: OrderStatus.PENDING,
        quantity: 9,
        amount: 1000,
        createdAt: '2024-07-26T07:13:44.339Z',
        updatedAt: '2024-07-26T07:13:44.339Z',
        customer: null,
        products: [
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
            orderProduct: [
              {
                id: 1,
                quantity: 2,
                amount: 300,
                createdAt: '2024-07-26T11:55:52.500Z',
                updatedAt: '2024-07-26T11:55:52.500Z',
              },
            ],
            category: {
              id: 1,
              name: 'Desktop',
              color: 'green',
              icon: 'desktop',
              createdAt: '2024-07-25T15:06:54.451Z',
              updatedAt: '2024-07-25T15:06:54.451Z',
            },
          },
        ],
      },
    ],
    products: [
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
        orderProduct: [
          {
            id: 1,
            quantity: 2,
            amount: 300,
            createdAt: '2024-07-26T11:55:52.500Z',
            updatedAt: '2024-07-26T11:55:52.500Z',
          },
        ],
        category: {
          id: 1,
          name: 'Desktop',
          color: 'green',
          icon: 'desktop',
          createdAt: '2024-07-25T15:06:54.451Z',
          updatedAt: '2024-07-25T15:06:54.451Z',
        },
      },
    ],
  },
];

const userId = 1;
const updateUserDto = {
  firstName: 'Jane',
  lastName: 'Jane',
  email: 'jane@example.com',
  id: 1,
  role: Role.ADMIN,
  password: 'Mweru123',
  // orders: [],
  // products: [],
  createdAt: '2024-07-25T15:06:54.451Z',
  updatedAt: '2024-07-25T15:06:54.451Z',
};


const existingUser = new User();
existingUser.id = userId;
existingUser.firstName = 'Jane';
existingUser.lastName = 'Jane';
existingUser.email = 'jane@example.com';
existingUser.role = Role.ADMIN;
existingUser.password = 'Mweru123';
// existingUser.orders = [];

const updatedUser = { ...existingUser, ...updateUserDto };

// export default mockUserRepository;
export {
  mockUserRepository,
  newUser,
  createdUser,
  users,
  userId,
  updateUserDto,
  existingUser,
  updatedUser,
  mockDatabaseService,
};
