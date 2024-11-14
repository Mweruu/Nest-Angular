import { Order } from '../../src/server/model/order/entities/order.entity';
import { Role, User } from '../../src/server/model/user/entities/user.entity';
import { Product } from '../../src/server/model/products/entities/product.entity';

const mockUserRepository = {
  create: jest.fn(),
  findOneUser: jest.fn(),
  createf: jest
    .fn(() => 'fn')
    .mockReturnValue('default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call'),
  find: jest.fn(),
  findOne: jest.fn(),
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
  email: 'janeson@example.com',
  role: 'ADMIN',
  password: 'Mweru123',
  orders: [],
  products: [],
  message: 'User Created',
};

const createdUser = {
  id: 1,
  ...newUser,
};


const users = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@gmail.com',
    password: 'Mweru123',
    role: Role.ADMIN,
    createdAt: '2024-07-26T07:13:44.339Z',
    updatedAt: '2024-07-26T07:13:44.339Z',
    orders: [],
    products: []
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@gmail.com',
    password: 'Mweru123',
    role: Role.ENGINEER,
    createdAt: '2024-07-26T07:13:44.339Z',
    updatedAt: '2024-07-26T07:13:44.339Z',
    orders: [],
    products: []
  },
  {
    id: 3,
    firstName: 'Janet',
    lastName: 'Seth',
    email: 'janet@gmail.com',
    password: 'Mweru123',
    role: Role.INTERN,
    createdAt: '2024-07-26T07:13:44.339Z',
    updatedAt: '2024-07-26T07:13:44.339Z',
    orders: [],
    products: []
  }
];

const userId = 1;
const updateUserDto = {
  firstName: newUser.firstName,
  lastName: newUser.lastName,
  email: newUser.email,
  id: 1,
  role: Role.ADMIN,
  password: 'Mweru123',
  createdAt: '2024-07-25T15:06:54.451Z',
  updatedAt: '2024-07-25T15:06:54.451Z',
};


const existingUser = new User();
existingUser.id = userId;
existingUser.firstName = newUser.firstName;
existingUser.lastName = newUser.lastName;
existingUser.email = "janett@gmail.com";
existingUser.role = Role.ADMIN;
existingUser.password = 'Mweru123';


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
