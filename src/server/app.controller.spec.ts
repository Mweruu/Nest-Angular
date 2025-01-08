import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user/entities/user.entity';
import { Auth } from './model/auth/entities/auth.entity';
import { Category } from './model/category/entities/category.entity';
import { OrderProduct } from './model/order-product/entities/order-product.entity';
import { Order } from './model/order/entities/order.entity';
import { Product } from './model/products/entities/product.entity';

describe('AppController', () => {
  let appController: AppController;
  
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'root',
          password: 'admin',
          database: 'test',
          entities: [User, Auth, Category, OrderProduct, Order, Product], 
          synchronize: true,
          logging: false, 
        }),
        TypeOrmModule.forFeature([User, Auth, Category, OrderProduct, Order, Product]),  
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);

  });

  describe('root', () => {
    it('should return "Nest js app running!"', () => {
      expect(appController.getHello()).toBe('Nest js app running!');
    });
  });
});


