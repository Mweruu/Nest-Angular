import { DataSource } from 'typeorm';
import { User } from './model/user/entities/user.entity';
import { Category } from './model/category/entities/category.entity';
import { OrderProduct } from './model/order-product/entities/order-product.entity';
import { Order } from './model/order/entities/order.entity';
import { Product } from './model/products/entities/product.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'admin',
  database: 'test',
  entities: [User, Order, OrderProduct, Product, Category],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new user into the database...');
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    await AppDataSource.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);

    console.log('Loading users from the database...');
    const users = await AppDataSource.manager.find(User);
    console.log('Loaded users: ', users);

    console.log(
      'Here you can setup and run express / fastify / any other framework.',
    );
  })
  .catch((error) => console.log(error));
