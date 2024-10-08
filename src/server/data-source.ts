import 'reflect-metadata';
import { DataSource } from 'typeorm';
// import { User } from './model/user/entities/user.entity';

export const AppDataSourceff = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'myPassword',
  database: 'mytypeorm',
  synchronize: true,
  logging: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  // entities: [User],
  migrations: [],
  subscribers: [],
});
